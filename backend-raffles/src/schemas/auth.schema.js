export const registerSchema = {
  type: 'object',
  required: ['fullName', 'nationalId', 'phone', 'email', 'password'],
  properties: {
    fullName: { type: 'string', minLength: 3 },
    nationalId: { type: 'string', minLength: 5 },
    phone: { type: 'string', minLength: 6 },
    whatsapp: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 }
  }
};

export const loginSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 }
  }
};

