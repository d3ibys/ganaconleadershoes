import { sendTestEmail } from '../controllers/test.controller.js';

export default async function testMailRoutes(fastify, options) {
  fastify.post('/test/send-email', sendTestEmail);
}

