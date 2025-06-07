import fp from 'fastify-plugin';
import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';

async function authPlugin(fastify, opts) {
  fastify.decorate('authenticate', async function (request, reply) {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.code(401).send({ error: 'Token missing or malformed' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);

      const user = await User.findById(decoded.id).select('-password');
      if (!user) return reply.code(401).send({ error: 'User not found' });

      request.user = user; // Anexar al request
    } catch (err) {
      return reply.code(401).send({ error: 'Invalid or expired token' });
    }
  });

  fastify.decorate('isAdmin', async function (request, reply) {
    if (request.user?.role !== 'admin') {
      return reply.code(403).send({ error: 'Access denied: Admins only' });
    }
  });
}

export default fp(authPlugin);
