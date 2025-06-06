export default async function userRoutes(fastify) {
  // Ruta protegida para cualquier usuario autenticado
  fastify.get('/users/me', {
    preHandler: [fastify.authenticate],
    handler: async (req, reply) => {
      reply.send(req.user);
    }
  });

  // Ruta solo para admin
  fastify.get('/admin/dashboard', {
    preHandler: [fastify.authenticate, fastify.isAdmin],
    handler: async (req, reply) => {
      reply.send({
        message: `Bienvenido administrador ${req.user.fullName}`,
        role: req.user.role
      });
    }
  });
}

