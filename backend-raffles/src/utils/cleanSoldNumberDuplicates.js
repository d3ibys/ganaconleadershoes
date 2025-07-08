import mongoose from 'mongoose';
import Raffle from '../models/raffle.model.js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Cargar variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Verificar si se está ejecutando en modo dry-run
const isDryRun = process.argv.includes('--dry-run');

// Crear carpeta de backups si no existe
const backupDir = path.resolve(__dirname, '../../backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Obtener timestamp para el archivo de backup
const getTimestamp = () => {
  const now = new Date();
  return now.toISOString().replace(/[-:.]/g, '').slice(0, 15);
};

// Función principal
const cleanSoldNumberDuplicates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`🔌 Conectado a MongoDB\nModo: ${isDryRun ? 'Dry-run (sin guardar cambios)' : 'Modificación activa'}\n`);

    const raffles = await Raffle.find({});
    let totalRafflesWithDuplicates = 0;
    let totalNumbersRemoved = 0;

    const backupData = [];

    for (const raffle of raffles) {
      const counts = {};
      const originalSold = raffle.soldNumbers || [];
      const uniqueSold = [];

      for (const num of originalSold) {
        counts[num] = (counts[num] || 0) + 1;
        if (counts[num] === 1) {
          uniqueSold.push(num); // solo si es la primera vez que aparece
        }
      }

      const duplicates = Object.entries(counts).filter(([_, count]) => count > 1);

      if (duplicates.length > 0) {
        totalRafflesWithDuplicates += 1;
        const removed = originalSold.length - uniqueSold.length;
        totalNumbersRemoved += removed;

        console.log(`⚠️ Rifa: ${raffle.slug || raffle._id}`);
        console.log(`  Duplicados detectados: ${duplicates.length}`);
        duplicates.forEach(([num, count]) => {
          console.log(`    - ${num} → ${count} veces`);
        });
        console.log(`  Números eliminados: ${removed}`);
        console.log('---');

        // Guardar backup antes de modificar
        backupData.push({
          raffleId: raffle._id,
          slug: raffle.slug,
          originalSoldNumbers: originalSold,
          duplicates: duplicates.map(([num, count]) => ({ num, count })),
        });

        if (!isDryRun) {
          raffle.soldNumbers = uniqueSold;
          await raffle.save();
        }
      }
    }

    // Guardar backup en archivo si hubo cambios
    if (!isDryRun && backupData.length > 0) {
      const backupPath = path.join(backupDir, `raffle-soldNumbers-backup-${getTimestamp()}.json`);
      fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
      console.log(`💾 Backup guardado en: ${backupPath}`);
    }

    console.log('\n✅ Resumen final');
    console.log(`  Rifas revisadas: ${raffles.length}`);
    console.log(`  Rifas con duplicados: ${totalRafflesWithDuplicates}`);
    console.log(`  Total de números duplicados eliminados: ${totalNumbersRemoved}`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Error al limpiar duplicados:', err);
    process.exit(1);
  }
};

cleanSoldNumberDuplicates();

