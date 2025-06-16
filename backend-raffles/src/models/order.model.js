import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    raffle: { type: mongoose.Schema.Types.ObjectId, ref: 'Raffle', required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    numbers: { type: [Number], required: true, default: [] },
    status: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      enum: ['pago_movil', 'zelle', 'binance'],
      required: false
    },
    verificationCode: {
      type: String,
      required: false,
      trim: true,
    },
    transactionId: {
      type: String,
      required: false,
      trim: true
    },
    zelleSenderName: {
      type: String,
      required: false,
      trim: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Order', OrderSchema)
