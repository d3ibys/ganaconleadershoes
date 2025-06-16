import mongoose from 'mongoose';

const RaffleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  details: { type: String },

  totalNumbers: { type: Number, required: true },
  soldNumbers: { type: [Number], default: [] },
  totalSoldNumbers: { type: Number, default: 0 },

  price: { type: Number, required: true },

  // Premio y ganadores
  firstPrize: { type: String },
  secondPrize: { type: String },
  thirdPrize: { type: String },

  imageMain: { type: String },
  imageFirstPrize: { type: String },
  imageSecondPrize: { type: String },
  imageThirdPrize: { type: String },

  firstPrizeWinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', default: null },
  secondPrizeWinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', default: null },
  thirdPrizeWinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', default: null },

}, {
  timestamps: true
});

export default mongoose.model('Raffle', RaffleSchema);

