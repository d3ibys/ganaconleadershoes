import {
  createRaffle,
  getAllRaffles,
  getRaffleBySlug,
  updateRaffle,
  assignWinners,
  deleteRaffle,
  setRewardedNumbers
} from '../controllers/raffle.controller.js';

export default async function raffleRoutes(fastify, options) {
  // Crear una rifa (protegida)
  fastify.post('/raffles', {
    preHandler: [fastify.verifyApiKey],
    handler: createRaffle,
  });

  fastify.post('/raffle/set/rewarded-numbers', {
    preHandler: [fastify.authenticate],
    handler: setRewardedNumbers,
  });

  // Editar una rifa por ID (protegida)
  fastify.put('/raffles/:id', {
    preHandler: [fastify.authenticate],
    handler: updateRaffle,
  });

  fastify.post('/test', {
    preHandler: [fastify.authenticate],
    handler: createRaffle,
  });

  // Eliminar una rifa por ID (protegida)
  fastify.delete('/raffles/:id', {
    preHandler: [fastify.authenticate],
    handler: deleteRaffle,
  });

  // Obtener todas las rifas (pública)
  fastify.get('/raffles', getAllRaffles);

  // Obtener rifa por slug (pública)
  fastify.get('/raffles/:slug', getRaffleBySlug);
}

