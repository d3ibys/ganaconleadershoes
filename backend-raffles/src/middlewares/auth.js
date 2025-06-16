import fp from 'fastify-plugin';
import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';

async function authPlugin(fastify, opts) {
  // Middleware: Verifica JWT y adjunta usuario
  fastify.decorate('authenticate', async function (request, reply) {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Authorization token is missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = verifyToken(token); // Puede lanzar error si el token es inválido
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return reply.code(401).send({ error: 'User associated with token not found' });
      }

      request.user = user; // Usuario disponible en las rutas protegidas
    } catch (err) {
      return reply.code(401).send({ error: 'Invalid or expired token', details: err.message });
    }
  });

  // Middleware: Valida rol administrador
  fastify.decorate('isAdmin', async function (request, reply) {
    if (!request.user || request.user.role !== 'admin') {
      return reply.code(403).send({ error: 'Access denied: Admins only' });
    }
  });
}

export default fp(authPlugin);

