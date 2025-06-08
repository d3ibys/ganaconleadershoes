import { createUser, findUserByEmail } from '../services/user.service.js';
import { signToken } from '../utils/jwt.js';

export const registerController = async (req, reply) => {
  try {
    const user = await createUser(req.body);
    const token = signToken({ id: user._id, role: user.role });

    reply.code(201).send({
      token,
      user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    reply.code(400).send({ error: err.message });
  }
};

export const loginController = async (req, reply) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user || !(await user.comparePassword(req.body.password))) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const token = signToken({ id: user._id, role: user.role });

    reply.send({
      token,
      user: {
        fullName: user.fullName,
        nationalId: user.nationalId,
        phone: user.phone,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (err) {
    reply.code(500).send({ error: 'Server error' });
  }
};

