import {
  createPreOrder,
  validatePayment,
  changeOrderStatus,
  resendTicket
} from '../controllers/order.controller.js';

export default async function orderRoutes(fastify, options) {
  // Crear preorden (pública)
  fastify.post('/raffle/preorders', createPreOrder);

  // Validar pago (pública o protegida según flujo)
  fastify.post('/order/validate/payment', validatePayment);
  fastify.post('/order/change/status', changeOrderStatus);
  fastify.post('/order/resend/ticket', resendTicket);
}

