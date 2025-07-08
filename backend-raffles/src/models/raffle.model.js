import mongoose from 'mongoose';

const RaffleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  details: { type: String },

  totalNumbers: { type: Number, required: true },
  soldNumbers: { type: [String], default: [] },
  totalSoldNumbers: { type: Number, default: 0 },
  rewardedNumbers: { type: [String], default: [] },
  availableNumbers: {
     type: [String], // importante: no Array
     default: [],
  },

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

