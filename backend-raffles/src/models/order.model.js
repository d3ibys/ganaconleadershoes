import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    raffle: { type: mongoose.Schema.Types.ObjectId, ref: 'Raffle', required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    numbers: { type: [Number], default: [] },
    status: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      default: 'pending'
    }
  },
  { timestamps: true }
)

export default mongoose.model('Order', OrderSchema)

