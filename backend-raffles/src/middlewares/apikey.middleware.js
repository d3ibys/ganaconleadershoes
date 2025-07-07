import fp from 'fastify-plugin';

async function verifyApiKey(req, reply) {
  const apiKey = req.headers['x-api-key'];
  const storedApiKey = process.env.API_KEY;

  if (typeof apiKey !== 'string' || apiKey !== storedApiKey) {
    // Lanzar un error para que Fastify gestione la respuesta y corte el flujo
    reply.code(401);
    throw new Error('Unauthorized: Invalid API Key');
  }
}

// Opcional: envolver con fastify-plugin para mejor integración y testeo
export default fp(async function (fastify, opts) {
  fastify.decorate('verifyApiKey', verifyApiKey);
});

