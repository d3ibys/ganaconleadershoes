# GanaconLeaderShoes

Repositorio privado para la gestión de rifas y usuarios, desarrollado como parte de la iniciativa GanaconLeaderShoes. Incluye un backend basado en Node.js utilizando Fastify y MongoDB.

## ¿Qué hace este repositorio?

Este proyecto provee una API para la gestión de rifas y usuarios. Entre sus principales funcionalidades se encuentran:

- Registro y autenticación de usuarios.
- Gestión de usuarios (consultar perfil, actualizar información, etc).
- Protección de rutas mediante autenticación JWT.
- Persistencia de datos utilizando MongoDB y Mongoose.

El backend está diseñado pensando en la escalabilidad y la seguridad, utilizando buenas prácticas como el uso de middlewares, separación de responsabilidades en controladores, modelos y servicios, y validación de datos.

## Instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/d3ibys/ganaconleadershoes.git
   cd ganaconleadershoes/backend-raffles
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Crea un archivo `.env` con el siguiente contenido:**

   ```
   PORT=4000
   MONGODB_URI=<tu_uri_de_mongodb>
   JWT_SECRET=<tu_secreto_jwt>
   ```

   Reemplaza `<tu_uri_de_mongodb>` y `<tu_secreto_jwt>` por tus valores correspondientes.

4. **Ejecuta el servidor en modo desarrollo**

   ```bash
   npm run dev
   ```

   O para producción:

   ```bash
   npm start
   ```

## Tecnologías principales

- Node.js
- Fastify
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- Bcrypt (hashing de contraseñas)
- Dotenv (variables de entorno)

## Estructura del backend

- `src/app.js`: Punto de entrada principal, configuración del servidor y registro de rutas.
- `src/routes/`: Rutas de la API (autenticación, usuarios).
- `src/controllers/`: Lógica de negocio y controladores.
- `src/models/`: Modelos de datos (ejemplo: Usuario).
- `src/middlewares/`: Middlewares para autenticación y validaciones.
- `src/services/` y `src/utils/`: Lógica auxiliar y servicios adicionales.

## Nota

Este repositorio es privado. Si necesitas acceso, contacta con el administrador.

