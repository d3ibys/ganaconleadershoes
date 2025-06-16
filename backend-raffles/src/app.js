import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';

import { connectDB } from './config/db.js';
import authPlugin from './middlewares/auth.js'; // Plugin JWT
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import raffleRoutes from './routes/raffle.routes.js';
import orderRoutes from './routes/order.routes.js';

dotenv.config();

const app = Fastify({ logger: true });

// Conexión a la base de datos
connectDB();

// Registrar CORS primero
await app.register(cors, {
  origin: '*', // Para dev, en prod usa dominio específico
});

// Registrar el plugin de autenticación JWT
app.register(authPlugin); // Debe ir antes que las rutas que usan fastify.authenticate

// Registrar rutas
app.register(authRoutes, { prefix: '/api/auth' });
app.register(userRoutes, { prefix: '/api' });      // Rutas protegidas
app.register(raffleRoutes, { prefix: '/api' });    // Rutas protegidas
app.register(orderRoutes, { prefix: '/api' });     // Rutas protegidas

// Arrancar servidor
const start = async () => {
  try {
    await app.listen({
      port: process.env.PORT || 4000,
      host: process.env.HOST || '127.0.0.1'
    });
    console.log(`🚀 Server running on http://${process.env.HOST || localhost}:${process.env.PORT || 4000}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

