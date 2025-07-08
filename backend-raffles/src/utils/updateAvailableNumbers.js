import mongoose from 'mongoose';
import Raffle from '../models/raffle.model.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Cargar el .env desde dos niveles arriba
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const generateAllNumbers = (totalNumbers) => {
  const numbers = [];
  for (let i = 0; i < totalNumbers; i++) {
    numbers.push(i.toString().padStart(4, '0'));
  }
  return numbers;
};

const updateAvailableNumbers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔌 Conectado a MongoDB');

    const raffles = await Raffle.find({});

    for (const raffle of raffles) {
      const allNumbers = generateAllNumbers(raffle.totalNumbers);
      const soldSet = new Set(raffle.soldNumbers || []);
      const available = allNumbers.filter(num => !soldSet.has(num));

      raffle.availableNumbers = available; // ✅ Array directamente
      await raffle.save();

      console.log(`✅ Rifa '${raffle.slug || raffle._id}' actualizada con ${available.length} números disponibles.`);
    }

    console.log('✅ Proceso completo');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error actualizando availableNumbers:', error);
    process.exit(1);
  }
};

updateAvailableNumbers();

