// models/TopTenTicketsPurchased.js
import mongoose from 'mongoose';

export default mongoose.model(
  'TopTenTicketsPurchased',
  new mongoose.Schema({}, { strict: false }),
  'TopTenTicketsPurchased' // <- nombre de la vista exacto
);

