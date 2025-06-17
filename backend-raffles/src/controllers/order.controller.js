import Raffle from '../models/raffle.model.js';
import User from '../models/User.js';
import Order from '../models/order.model.js';
import Ticket from '../models/ticket.model.js';
import { assignRandomNumbers } from '../utils/numberAssigner.js';
import { sendWhatsappMessage } from '../services/whatsapp.service.js';
import jwt from 'jsonwebtoken';
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

    let existingUser = await User.findOne({ nationalId: user.cedula });
    let token = null;

    if (!existingUser) {
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      const newUser = new User({
        fullName: user.fullName,
        email: user.email,
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
      ticketQuantity: order.quantity,
      totalAmount: order.total,
      assignedNumbers,
      paymentMethod,
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


console.log('Orden datos: '+order)
    
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
    if (!order) return reply.code(404).send({ error: 'Orden no encontrada' });

    if (order.status === 'paid') {
      return reply.code(400).send({ error: 'La orden ya fue pagada' });
    }

    const raffle = await Raffle.findById(order.raffle._id);
    //const assignedNumbers = assignRandomNumbers(raffle.totalNumbers, raffle.soldNumbers, order.quantity);

    order.status = 'paid';
    await order.save();

    const sendWhatsappResult = await sendWhatsappMessage('584248362674', 'Order Pagada');

    reply.code(200).send({ 
	   message: 'Pago en proceso de verificación, los números ya fuerón asignados', 
	   whatsappMessageStatus: sendWhatsappResult,
	   status: true
    });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

