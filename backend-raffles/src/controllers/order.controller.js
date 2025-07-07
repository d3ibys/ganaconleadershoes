import mongoose from 'mongoose';
import Raffle from '../models/raffle.model.js';
import User from '../models/User.js';
import Order from '../models/order.model.js';
import Ticket from '../models/ticket.model.js';
import { assignRandomNumbers } from '../utils/numberAssigner.js';  // Asegúrate de que esté importada
import { sendWhatsappMessage } from '../services/whatsapp.service.js';
import mailerService from '../services/mailer.service.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import bcrypt from 'bcrypt';

// 🔧 Utilidades
const formatNumbers = (numbers) => {
  return numbers.map(n => n.toString().padStart(4, '0'));
};

const buildWhatsappMessage = ({ user, order, numbers }) => {
  const formattedNumbers = numbers.join(', ');
  return `✅ Tu orden fue confirmada!
━━━━━━━━━━━━━━━━━
${user.fullName}, gracias por tu compra
━━━━━━━━━━━━━━━━━
📝 Orden: ${order._id}
━━━━━━━━━━━━━━━━━
🎟️  Tickets: ${formattedNumbers}
━━━━━━━━━━━━━━━━━
🪪 Cédula: ${user.nationalId}
━━━━━━━━━━━━━━━━
💰 Monto pagado: ${order.total}
━━━━━━━━━━━━━━━━
El gran día se acerca, el sorteo se dará a conocer cuando se haya vendido el 100% de los números.
¡Te deseamos mucha suerte! Recuerda que la lotería Super Gana es nuestra referencia.
Y como decimos en la familia Leader Shoes: "Tú sólo juega, lo demás es cosa del destino".`;
};

// 🎟️ Crear Preorden
export const createPreOrder = async (request, reply) => {
  const session = await mongoose.startSession();
  try {
    const { slug, quantity, user } = request.body;

    if (!slug || !quantity || !user?.email || !user?.fullName || !user?.phone || !user?.cedula) {
      return reply.code(400).send({ error: 'Datos incompletos' });
    }

    const raffle = await Raffle.findOne({ slug });
    if (!raffle) return reply.code(404).send({ error: 'Rifa no encontrada' });

    const remaining = raffle.totalNumbers - raffle.totalSoldNumbers;
    if (quantity > remaining) return reply.code(400).send({ error: 'No hay suficientes boletos disponibles' });

    let existingUser = await User.findOne({
      $or: [
        { nationalId: user.cedula },
        { email: user.email }
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
    reply.code(500).send({ error: 'Error al crear la preorden' });
  } finally {
    session.endSession();  // Siempre finalizar la sesión
  }
};

// ✅ Validar pago (crea ticket y marca como pendiente)
export const validatePayment = async (request, reply) => {
  const session = await mongoose.startSession();
  try {
    const { orderId, paymentMethod, extraInfo } = request.body;

    const order = await Order.findById(orderId)
      .populate('raffle', 'name description price totalNumbers soldNumbers')
      .populate('user', 'fullName nationalId email phone');

    if (!order) return reply.code(404).send({ error: 'Orden no encontrada' });
    if (order.status === 'paid') return reply.code(400).send({ error: 'La orden ya fue pagada' });

    const raffle = order.raffle;

    let assignedNumbers = await assignRandomNumbers(
      raffle.totalNumbers,
      raffle.soldNumbers,
      order.quantity,
      session
    );

    if (!Array.isArray(assignedNumbers) || assignedNumbers.length === 0) {
      throw new Error('No se pudieron asignar los números');
    }

    assignedNumbers = formatNumbers(assignedNumbers);

    const ticket = new Ticket({
      raffle: raffle._id,
      user: order.user._id,
      order: order._id,
      ticketQuantity: order.quantity,
      totalAmount: order.total,
      assignedNumbers,
      paymentMethod,
      paymentReference: extraInfo,
      status: 'pending',
      verificationDate: new Date()
    });

    await ticket.save({ session });

    order.status = 'pending';
    order.paymentMethod = paymentMethod;
    order.verificationCode = extraInfo;
    await order.save({ session });

    const whatsappMessage = `
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
    `.trim();

    const sendWhatsappResult = await sendWhatsappMessage('584248362674', whatsappMessage);

    reply.code(200).send({
      message: 'Pago en proceso de verificación, los números ya fueron asignados',
      ticket,
      whatsappMessageStatus: sendWhatsappResult,
      status: true
    });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  } finally {
    session.endSession();
  }
};

// 🧾 Confirmar pago y actualizar rifa
export const changeOrderStatus = async (request, reply) => {
  const session = await mongoose.startSession();
  try {
    const { orderId } = request.body;

    const order = await Order.findById(orderId)
      .populate('raffle', 'title description price totalNumbers soldNumbers totalSoldNumbers')
      .populate('user', 'fullName nationalId email phone');

    if (!order) return reply.code(404).send({ error: 'Orden no encontrada' });
    if (order.status === 'paid') return reply.code(400).send({ error: 'La orden ya fue pagada' });

    const raffle = order.raffle;

    let assignedNumbers = await assignRandomNumbers(
      raffle.totalNumbers,
      raffle.soldNumbers,
      order.quantity,
      session
    );

    if (!Array.isArray(assignedNumbers) || assignedNumbers.length === 0) {
      throw new Error('No se pudieron asignar los números');
    }

    assignedNumbers = formatNumbers(assignedNumbers);

    order.numbers = assignedNumbers;
    order.status = 'paid';
    await order.save({ session });

    raffle.soldNumbers.push(...assignedNumbers);
    raffle.totalSoldNumbers = (raffle.totalSoldNumbers || 0) + assignedNumbers.length;
    await raffle.save({ session });

    const message = buildWhatsappMessage({ user: order.user, order, numbers: assignedNumbers });

    await axios.post('https://bot.consoltics.com/api/send-message', {
      phone: order.user.phone,
      message
    });

    reply.code(200).send({
      message: 'Orden confirmada y números asignados',
      whatsappMessageStatus: 'Los tickets ya fueron asignados al usuario correctamente.',
      whatsappMessageUser: message,
      status: true
    });

    const result = await mailerService.sendOrderConfirmation({
      recipientEmail: order.user.email,
      recipientName: order.user.fullName,
      nationalId: order.user.nationalId,
      orderNumber: order._id,
      ticketNumbers: assignedNumbers,
      raffle: {
        title: raffle.description,
        description: '',
        rewardedNumbers: raffle.rewardedNumbers
      }, 
      uuid: order._id
    });
    console.log('NationalID enviado: ',order.user.nationalId);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  } finally {
    session.endSession();
  }
};

// 🔁 Reenviar ticket
export const resendTicket = async (request, reply) => {
  const session = await mongoose.startSession();
  try {
    const { orderId } = request.body;

    let order = await Order.findById(orderId)
      .populate('raffle', 'name description price totalNumbers soldNumbers totalSoldNumbers')
      .populate('user', 'fullName nationalId email phone');

    if (!order) return reply.code(404).send({ error: 'Orden no encontrada' });

    const raffle = order.raffle;
    let assignedNumbers = order.numbers;

    if (order.status !== 'paid') {
      assignedNumbers = await assignRandomNumbers(
        raffle.totalNumbers,
        raffle.soldNumbers,
        order.quantity,
        session
      );

      if (!Array.isArray(assignedNumbers) || assignedNumbers.length === 0) {
        throw new Error('No se pudieron asignar los números');
      }

      assignedNumbers = formatNumbers(assignedNumbers);
      order.numbers = assignedNumbers;
      order.status = 'paid';
      await order.save({ session });

      raffle.soldNumbers.push(...assignedNumbers);
      raffle.totalSoldNumbers = (raffle.totalSoldNumbers || 0) + assignedNumbers.length;
      await raffle.save({ session });
    }

    const message = buildWhatsappMessage({ user: order.user, order, numbers: assignedNumbers });

    await axios.post('https://bot.consoltics.com/api/send-message', {
      phone: order.user.phone,
      message
    });

    reply.code(200).send({
      message: 'Ticket reenviado correctamente',
      whatsappMessageStatus: 'Los tickets ya fueron reenviados al usuario correctamente.',
      whatsappMessageUser: message,
      status: true
    });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  } finally {
    session.endSession();
  }
};

