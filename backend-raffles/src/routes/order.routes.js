import Raffle from '../models/raffle.model.js'
import User from '../models/User.js'
import Order from '../models/order.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

async function orderRoutes(fastify, options) {
  fastify.post('/raffle/preorders', async (request, reply) => {
    try {
      const { slug, quantity, user } = request.body

      if (!slug || !quantity || !user?.email || !user?.fullName || !user?.phone || !user?.cedula || !user?.whatsapp) {
        return reply.code(400).send({ error: 'Datos incompletos' })
      }

      // Buscar la rifa por slug
      const raffle = await Raffle.findOne({ slug })
      if (!raffle) {
        return reply.code(404).send({ error: 'Rifa no encontrada' })
      }

      // Validar disponibilidad
      const remaining = raffle.totalNumbers - raffle.totalSoldNumbers
      if (quantity > remaining) {
        return reply.code(400).send({ error: 'No hay suficientes boletos disponibles' })
      }

      // Verificar si el usuario existe
      let existingUser = await User.findOne({ email: user.email })
      let token = null

      if (!existingUser) {
        const tempPassword = Math.random().toString(36).slice(-8)
        const hashedPassword = await bcrypt.hash(tempPassword, 10)
        const newUser = new User({
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          whatsapp: user.whatsapp,
          nationalId: user.cedula,
          password: hashedPassword
        })
        await newUser.save()
        existingUser = newUser

        // Autenticar automáticamente
        token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET || 'secret', {
          expiresIn: '7d'
        })
      }

      // Calcular total
      const total = raffle.price * quantity

      // Crear la orden
      const order = new Order({
        user: existingUser._id,
        raffle: raffle._id,
        quantity,
        total
      })

      await order.save()

      return reply.code(201).send({
        orderId: order._id,
        total,
        slug: raffle.slug,
        token: token || undefined
      })
    } catch (err) {
      console.error(err)
      reply.code(500).send({ error: 'Error al crear la preorden' })
    }
  })
}

export default orderRoutes

