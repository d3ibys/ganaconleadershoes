import Raffle from '../models/raffle.model.js';
import User from '../models/User.js';
import Order from '../models/order.model.js';
import Ticket from '../models/ticket.model.js';
import { assignRandomNumbers } from '../utils/numberAssigner.js';
import { sendWhatsappMessage } from '../services/whatsapp.service.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import bcrypt from 'bcrypt';

// Crear una preorden
export const createPreOrder = async (request, reply) => {
  try {
    const { slug, quantity, user } = request.body;

    if (!slug || !quantity || !user?.email || !user?.fullName || !user?.phone || !user?.cedula) {
      return reply.code(400).send({ error: 'Datos incompletos' });
    }

    const raffle = await Raffle.findOne({ slug });
    if (!raffle) return reply.code(404).send({ error: 'Rifa no encontrada' });

    const remaining = raffle.totalNumbers - raffle.totalSoldNumbers;
    if (quantity > remaining) return reply.code(400).send({ error: 'No hay suficientes boletos disponibles' });

//    let existingUser = await User.findOne({ nationalId: user.cedula });
let existingUser = await User.findOne({
  $or: [
    { nationalId: user.cedula },
    { email: user.email } // Suponiendo que 'user.email' es la otra variable por la que quieres buscar
  ]
});
    let token = null;

    if (!existingUser) {
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      const newUser = new User({
        fullName: user.fullName,
        email: user.email,
	state: user.state,
        phone: user.phone,
        whatsapp: user.whatsapp,
        nationalId: user.cedula,
        password: hashedPassword
      });
      await newUser.save();
      existingUser = newUser;

      token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    }

    const total = raffle.price * quantity;

    const order = new Order({
      user: existingUser._id,
      raffle: raffle._id,
      quantity,
      total
    });

    await order.save();

    return reply.code(201).send({
      orderId: order._id,
      total,
      slug: raffle.slug,
      token: token || undefined
    });
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: 'Error al crear la preorden' });
  }
};


export const validatePayment = async (request, reply) => {
  try {
    const { orderId, paymentMethod, extraInfo } = request.body;
    const order = await Order.findById(orderId)
                                      .populate('raffle', 'name description price') // Solo estos campos de raffle
                                      .populate('user', 'fullName nationalId email phone');        // Solo estos campos de user
    if (!order) return reply.code(404).send({ error: 'Orden no encontrada' });

    if (order.status === 'paid') {
      return reply.code(400).send({ error: 'La orden ya fue pagada' });
    }

    const raffle = await Raffle.findById(order.raffle._id);
    //const assignedNumbers = assignRandomNumbers(raffle.totalNumbers, raffle.soldNumbers, order.quantity);
    const assignedNumbers = assignRandomNumbers(
  	raffle.totalNumbers,
  	raffle.soldNumbers,
  	order.quantity
    ).map(n => n.toString().padStart(4, '0'));

    const ticket = new Ticket({
      raffle: raffle._id,
      user: order.user,
      order: order._id,
      ticketQuantity: order.quantity,
      totalAmount: order.total,
      assignedNumbers: assignedNumbers,
      paymentMethod: paymentMethod,
      paymentReference: extraInfo,
      status: 'pending',
      verificationDate: new Date()
    });

    await ticket.save();

    order.status = 'pending';
    order.numbers = assignedNumbers;
    order.paymentMethod = paymentMethod;
    order.verificationCode = extraInfo;
    await order.save();

    raffle.soldNumbers.push(...assignedNumbers);
    raffle.totalSoldNumbers += assignedNumbers.length;
    await raffle.save();


    
    const whatsappMessageAdmin = `
🏦 Método de pago: ${order.paymentMethod}
━━━━━━━━━━━━━━━━━
📝 Orden: ${order._id}
━━━━━━━━━━━━━━━━━
#️⃣ Código confirmación: ${order.verificationCode}
━━━━━━━━━━━━━━━━━
🎟️ Cantidad: ${order.quantity}
━━━━━━━━━━━━━━━━━
👩🏻‍🤝‍👨🏻 Cliente: ${order.user.fullName}
━━━━━━━━━━━━━━━━
🪪 Cédula: ${order.user.nationalId}
━━━━━━━━━━━━━━━━
📱Telef: ${order.user.phone}
━━━━━━━━━━━━━━━━
💰 Monto total: ${order.total}
`
    const sendWhatsappResult = await sendWhatsappMessage('584248362674', whatsappMessageAdmin);


    reply.code(200).send({ 
	   message: 'Pago en proceso de verificación, los números ya fuerón asignados', 
	   ticket,
	   whatsappMessageStatus: sendWhatsappResult,
	   status: true
    });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};


export const changeOrderStatus = async (request, reply) => {
  try {
    const { orderId, paymentMethod, extraInfo } = request.body;
    const order = await Order.findById(orderId)
                                      .populate('raffle', 'name description price') // Solo estos campos de raffle
                                      .populate('user', 'fullName nationalId email phone');        // Solo estos campos de user
    //if (!order) return reply.code(404).send({ error: 'Orden no encontrada' });
    if (!order) {
      return reply.code(404).send({ error: 'Orden no encontrada' });
      console.log('error: Orden no encontrada')
    }
   

    if (order.status === 'paid') {
      return reply.code(400).send({ error: 'La orden ya fue pagada' });
      console.log('error: La orden ya fue pagada.')
    }

    const raffle = await Raffle.findById(order.raffle._id);
    //const assignedNumbers = assignRandomNumbers(raffle.totalNumbers, raffle.soldNumbers, order.quantity);

    order.status = 'paid';
    await order.save();
    const formattedNumbers = order.numbers.join(', ');


 const whatsappMessageUser = `✅ Tu orden fue confirmada!
━━━━━━━━━━━━━━━━━
${order.user.fullName}, gracias por tu compra
━━━━━━━━━━━━━━━━━
📝 Orden: ${order._id}
━━━━━━━━━━━━━━━━━
🎟️  Tickets: ${formattedNumbers}
━━━━━━━━━━━━━━━━━
🪪 Cédula: ${order.user.nationalId}
━━━━━━━━━━━━━━━━
💰 Monto pagado: ${order.total}
━━━━━━━━━━━━━━━━
El gran día se acerca, el sorteo se dará a concer cuando se haya vendido el 100% de los números. 
¡Te deseamos mucha suerte! Recuerda que la lotería Super Gana es nuestra referencia. 
Y como decimos en la familia Leader Shoes: "Tú sólo juega, lo demás es cosa del destino".
`
    //const sendWhatsappResultUser = await sendWhatsappMessage(order.user.phone, whatsappMessageUser);
    //console.log('Whatsapp Usuario: ',order.user.phone,'Respuesta API: ',sendWhatsappResultUser)

const countryCode = (typeof order.user.phone === 'string' && order.user.phone.startsWith('4')) ? '58' : '1';

const respuesta = await axios.post('https://bot.consoltics.com/api/send-message', {
      phone: order.user.phone,
      message: whatsappMessageUser
    });
console.log('Numero: ',order.user.phone, 'Mensaje: ', whatsappMessageUser)
    reply.code(200).send({ 
	   message: 'Pago en proceso de verificación, los números ya fuerón asignados', 
	   whatsappMessageStatus: 'Los tickets ya fueron asignados al usuario correctamente.', //sendWhatsappResultUser,
	   whatsappMessageUser: whatsappMessageUser,
	   status: true
    });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};


export const resendTicket = async (request, reply) => {
  try {
    const { orderId, status, extraInfo } = request.body;
    const order = await Order.findById(orderId)
                                      .populate('raffle', 'name description price') // Solo estos campos de raffle
                                      .populate('user', 'fullName nationalId email phone');        // Solo estos campos de user
    //if (!order) return reply.code(404).send({ error: 'Orden no encontrada' });
    if (!order) {
      return reply.code(404).send({ error: 'Orden no encontrada' });
      console.log('error: Orden no encontrada')
    }
   
	let orderPaid = false
    if (order.status === 'paid') {
	 orderPaid = true
    }

    const raffle = await Raffle.findById(order.raffle._id);

let assignedNumbers;

if (orderPaid) {
    assignedNumbers = order.numbers;
} else {
    assignedNumbers = assignRandomNumbers(raffle.totalNumbers, raffle.soldNumbers, order.quantity);
}
    if (!orderPaid){ 
	order.numbers = assignedNumbers;
    }
    order.status = 'paid';
    await order.save();


    const orderUpdated = await Order.findById(orderId)
                                      .populate('raffle', 'name description price') // Solo estos campos de raffle
                                      .populate('user', 'fullName nationalId email phone');        // Solo estos campos de user
    const formattedNumbers = orderUpdated.numbers.join(', ');


 const whatsappMessageUser = `✅ Tu orden fue confirmada!
━━━━━━━━━━━━━━━━━
${order.user.fullName}, gracias por tu compra
━━━━━━━━━━━━━━━━━
📝 Orden: ${order._id}
━━━━━━━━━━━━━━━━━
🎟️  Tickets: ${formattedNumbers}
━━━━━━━━━━━━━━━━━
🪪 Cédula: ${order.user.nationalId}
━━━━━━━━━━━━━━━━
💰 Monto pagado: ${order.total}
━━━━━━━━━━━━━━━━
El gran día se acerca, el sorteo se dará a concer cuando se haya vendido el 100% de los números. 
¡Te deseamos mucha suerte! Recuerda que la lotería Super Gana es nuestra referencia. 
Y como decimos en la familia Leader Shoes: "Tú sólo juega, lo demás es cosa del destino".
`
    //const sendWhatsappResultUser = await sendWhatsappMessage(order.user.phone, whatsappMessageUser);
    //console.log('Whatsapp Usuario: ',order.user.phone,'Respuesta API: ',sendWhatsappResultUser)

const countryCode = (typeof order.user.phone === 'string' && order.user.phone.startsWith('4')) ? '58' : '1';

const respuesta = await axios.post('https://bot.consoltics.com/api/send-message', {
      phone: order.user.phone,
      message: whatsappMessageUser
    });
console.log('Numero: ',order.user.phone, 'Mensaje: ', whatsappMessageUser)
    reply.code(200).send({ 
	   message: 'Pago en proceso de verificación, los números ya fuerón asignados', 
	   whatsappMessageStatus: 'Los tickets ya fueron asignados al usuario correctamente.', //sendWhatsappResultUser,
	   whatsappMessageUser: whatsappMessageUser,
	   status: true
    });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

