import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import authPlugin from './middlewares/auth.js';

dotenv.config();

const app = Fastify({ logger: true });

connectDB();

app.register(authPlugin); // <-- Aquí
app.register(authRoutes, { prefix: '/api/auth' });
app.register(userRoutes, { prefix: '/api' }); // <-- Nuevas rutas protegidas

await app.register(cors, {
  // Opcional: configura los orígenes permitidos
  origin: '*', // Permite todos los orígenes (desarrollo). Para producción, especifica el dominio de tu frontend.
  // origin: ['http://localhost:3000', 'https://frontend.tudominio.com'],
  // credentials: true, // Si necesitas enviar cookies/autenticación
});


const start = async () => {
  try {
    await app.listen({ port: process.env.PORT || 4000, host: process.env.HOST || '127.0.0.1' });
    console.log(`🚀 Server running on http://localhost:${process.env.PORT || 4000}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

