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
}

export default raffleRoutes;

