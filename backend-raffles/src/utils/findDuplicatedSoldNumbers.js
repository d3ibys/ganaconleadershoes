import mongoose from 'mongoose';
import Raffle from '../models/raffle.model.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Cargar el .env desde dos niveles arriba
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const findDuplicatedSoldNumbers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔍 Buscando duplicados en soldNumbers...\n');

    const raffles = await Raffle.find({});
    let totalDuplicated = 0;

    for (const raffle of raffles) {
      const counts = {};
      const duplicates = {};

      for (const num of raffle.soldNumbers || []) {
        counts[num] = (counts[num] || 0) + 1;
        if (counts[num] > 1) {
          duplicates[num] = counts[num]; // guarda cantidad de veces repetido
        }
      }

      const duplicatedEntries = Object.entries(duplicates);

      if (duplicatedEntries.length > 0) {
        totalDuplicated += duplicatedEntries.length;

        console.log(`⚠️ Rifa: ${raffle.slug || raffle._id}`);
        console.log('Duplicados encontrados:');
        duplicatedEntries.forEach(([num, count]) => {
          console.log(`- Número ${num} → ${count} veces`);
        });
        console.log('---');
      }
    }

    if (totalDuplicated === 0) {
      console.log('✅ No se encontraron números duplicados en ninguna rifa.');
    } else {
      console.log(`\n🎯 Total de números distintos duplicados: ${totalDuplicated}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error buscando duplicados:', error);
    process.exit(1);
  }
};

findDuplicatedSoldNumbers();

