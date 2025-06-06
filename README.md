# ganaconleadershoes-backend

Backend para la aplicación de rifas "Gana con Leader Shoes".

## Descripción

Este proyecto es el backend de una plataforma de rifas donde los usuarios pueden comprar números para participar en sorteos. Cada rifa puede manejar hasta 10,000 números, los cuales se asignan de forma completamente aleatoria al momento de la compra. El sistema está diseñado para ser eficiente, seguro y escalable.

## Características principales

- Gestión de rifas con hasta 10,000 números por sorteo.
- Asignación aleatoria de números al ser comprados.
- Autenticación y autorización de usuarios mediante JWT.
- Gestión de usuarios y compras.
- API RESTful robusta y modular.
- Validación de datos y seguridad en las operaciones.

## Estructura del proyecto

```
/
├── src/
│   ├── app.js           # Configuración principal de Fastify y middlewares
│   ├── server.js        # Punto de entrada del servidor
│   ├── controllers/     # Lógica de negocio de cada módulo
│   ├── middlewares/     # Middlewares personalizados (ej: autenticación)
│   ├── models/          # Modelos de datos (Mongoose)
│   ├── routes/          # Definición de endpoints y rutas
│   ├── services/        # Servicios reutilizables y lógica auxiliar
│   ├── utils/           # Funciones utilitarias y helpers
│   └── validators/      # Validaciones de entrada (Zod)
├── seed.js              # Script para poblar la base de datos
├── package.json
├── .env.example         # Ejemplo de configuración de variables de entorno
└── README.md
```

## Stack tecnológico

- **Node.js**: Entorno de ejecución principal.
- **Fastify**: Framework para aplicaciones web rápidas y eficientes.
- **MongoDB + Mongoose**: Almacenamiento de datos flexible y escalable.
- **JWT (JSON Web Tokens)**: Autenticación y autorización segura.
- **Zod**: Validación de esquemas y entradas.
- **Bcrypt**: Hashing de contraseñas.
- **Dotenv**: Manejo de variables de entorno.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/d3ibys/ganaconleadershoes-backend.git
cd ganaconleadershoes-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto y completa los siguientes valores (puedes usar `.env.example` como referencia):

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ganaconleadershoes
JWT_SECRET=tu_clave_secreta
```

### 4. Ejecutar el servidor en desarrollo

```bash
npm run dev
```

El servidor estará disponible en: [http://localhost:3000](http://localhost:3000)

---

## Scripts útiles

- `npm run dev`: Arranca el servidor con recarga automática usando Nodemon.

## Contribución

Si deseas contribuir, por favor abre un issue o haz un fork del repositorio y envía tu pull request.

---

## Licencia

ISC
# ganaconleadershoes
