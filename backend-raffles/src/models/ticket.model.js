import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  raffle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Raffle',
    required: true,
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orders',
    required: false
  },
  ticketQuantity: {
    type: Number,
    required: true,
    min: 1
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  assignedNumbers: {
    type: [String],
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['pagoMovil', 'paypal', 'zelle'],
    required: true
  },
  paymentReference: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'paid'],
    default: 'pending'
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  verificationDate: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('Ticket', ticketSchema);

