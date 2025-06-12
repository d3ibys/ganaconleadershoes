import Raffle from '../models/raffle.model.js';

async function raffleRoutes(fastify, options) {
  // Crear una rifa
  fastify.post('/raffles', async (request, reply) => {
    try {
      const raffle = new Raffle(request.body);
      await raffle.save();
      reply.code(201).send(raffle);
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
  });

  // Obtener rifas con percentSold calculado
  fastify.get('/raffles', async (request, reply) => {
    try {
      const raffles = await Raffle.find().lean();

      const rafflesWithPercent = raffles.map(raffle => {
        const sold = raffle.totalSoldNumbers || 0;
        const total = raffle.totalNumbers || 1; // evitar división por cero
        const percentSold = parseFloat(((sold / total) * 100).toFixed(2));

        return {
          ...raffle,
          percentSold
        };
      });

      reply.send(rafflesWithPercent);
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });

  // Buscar una rifa por slug
  fastify.get('/raffles/:slug', async (request, reply) => {
    try {
      const { slug } = request.params;
      const raffle = await Raffle.findOne({ slug }).lean(); // Busca por el campo slug

      if (!raffle) {
        return reply.code(404).send({ error: 'Rifa no encontrada' });
      }

      // Calcular percentSold también para la rifa individual si es necesario
      const sold = raffle.totalSoldNumbers || 0;
      const total = raffle.totalNumbers || 1;
      const percentSold = parseFloat(((sold / total) * 100).toFixed(2));

      reply.send({ ...raffle, percentSold });
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });
}

export default raffleRoutes;
