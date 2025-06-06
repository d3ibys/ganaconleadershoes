import { registerController, loginController } from '../controllers/auth.controller.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

export default async function authRoutes(fastify) {
  fastify.post('/register', {
    schema: {
      body: registerSchema,
      response: {
        201: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                fullName: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string' }
              }
            }
          }
        }
      }
    },
    handler: registerController
  });

  fastify.post('/login', {
    schema: {
      body: loginSchema
    },
    handler: loginController
  });
}

