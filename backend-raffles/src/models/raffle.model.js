import mongoose from 'mongoose';

const RaffleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  details: { type: String },
  totalNumbers: { type: Number, required: true },
  soldNumbers: { type: [Number], default: [] },
  totalSoldNumbers: { type: Number, default: 0 },
  winningNumbers: { type: [Number], default: [] },
  imageMain: { type: String },
  imageFirstPrize: { type: String },
  imageSecondPrize: { type: String },
  imageThirdPrize: { type: String },
  price: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Raffle', RaffleSchema);
