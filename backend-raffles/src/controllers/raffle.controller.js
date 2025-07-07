import Raffle from '../models/raffle.model.js';
import Ticket from '../models/ticket.model.js';
import TopTen from '../models/topTenTicketsPurchased.js';

// Asignar ganadores a la rifa
export const assignWinners = async (req, res) => {
  try {
    const { raffleId, winners } = req.body;
    const raffle = await Raffle.findById(raffleId);

    if (!raffle) return res.status(404).json({ error: 'Rifa no encontrada' });

    const { first, second, third } = winners;

    const firstWinner = await Ticket.findOne({
      raffleId,
      assignedNumbers: first
    });

    const secondWinner = await Ticket.findOne({
      raffleId,
      assignedNumbers: second
    });

    const thirdWinner = await Ticket.findOne({
      raffleId,
      assignedNumbers: third
    });

    if (!firstWinner || !secondWinner || !thirdWinner) {
      return res.status(400).json({ error: 'Uno o más tickets ganadores no válidos' });
    }

    raffle.firstPrizeWinner = firstWinner._id;
    raffle.secondPrizeWinner = secondWinner._id;
    raffle.thirdPrizeWinner = thirdWinner._id;

    raffle.winningNumbers = [first, second, third];

    await raffle.save();

    res.status(200).json({
      message: 'Ganadores asignados exitosamente',
      winners: {
        first: firstWinner,
        second: secondWinner,
        third: thirdWinner
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Crear una nueva rifa (protegido)
export const createRaffle = async (request, reply) => {
  try {
    const raffle = new Raffle({
      ...request.body,
      createdBy: request.user._id,
    });
    await raffle.save();
    reply.code(201).type('application/json').send(raffle);
  } catch (err) {
    reply.code(400).send({ error: err.message });
  }
};

// Obtener todas las rifas (público)
export const getAllRaffles = async (request, reply) => {
  try {
    const raffles = await Raffle.find().lean();
    const topTen = await TopTen.find().sort({ totalTicketsPurchased: -1 }).limit(10).lean();

    const rafflesWithPercent = raffles.map(raffle => {
      const sold = raffle.totalSoldNumbers || 0;
      const total = raffle.totalNumbers || 1;
      const percentSold = parseFloat(((sold / total) * 100).toFixed(2));

      return {
        ...raffle,
        percentSold,
	topTen
      };
    });

    reply.send(rafflesWithPercent);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

// Obtener una rifa por slug (público)
export const getRaffleBySlug = async (request, reply) => {
  try {
    const { slug } = request.params;
    const raffle = await Raffle.findOne({ slug }).lean();
    const topTen = await TopTen.find().sort({ totalTicketsPurchased: -1 }).limit(10).lean();

    if (!raffle) {
      return reply.code(404).send({ error: 'Raffle not found' });
    }

    const sold = raffle.totalSoldNumbers || 0;
    const total = raffle.totalNumbers || 1;
    const percentSold = parseFloat(((sold / total) * 100).toFixed(2));

    reply.send({ ...raffle, percentSold, topTen });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

// Actualizar una rifa por ID (protegido)
export const updateRaffle = async (request, reply) => {
  try {
    const { id } = request.params;
    const update = request.body;

    const updatedRaffle = await Raffle.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedRaffle) {
      return reply.code(404).send({ error: 'Raffle not found' });
    }

    reply.send(updatedRaffle);
  } catch (err) {
    reply.code(400).send({ error: err.message });
  }
};

// Eliminar una rifa por ID (protegido)
export const deleteRaffle = async (request, reply) => {
  try {
    const { id } = request.params;
    const deleted = await Raffle.findByIdAndDelete(id);

    if (!deleted) {
      return reply.code(404).send({ error: 'Raffle not found' });
    }

    reply.send({ message: 'Raffle deleted successfully' });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

// crear números premiados


export async function setRewardedNumbers(request, reply) {
  const { slug, numbers } = request.body;

  if (!slug || !Array.isArray(numbers)) {
    throw request.server.httpErrors.badRequest('Datos inválidos: slug y numbers son requeridos');
  }

  const incomingNumbers = numbers.map(num => num.toString().trim());

  const raffle = await Raffle.findOne({ slug });

  if (!raffle) {
    throw request.server.httpErrors.notFound('Rifa no encontrada');
  }

  const newRewarded = incomingNumbers.filter(num => {
    const isSold = raffle.soldNumbers.includes(num);
    const isAlreadyRewarded = raffle.rewardedNumbers.includes(num);
    return !isSold && !isAlreadyRewarded;
  });

  if (newRewarded.length === 0) {
    throw request.server.httpErrors.conflict('Ninguno de los números puede ser premiado (ya vendidos o ya premiados)');
  }

  raffle.rewardedNumbers.push(...newRewarded);
  await raffle.save();

  return reply.send({
    success: true,
    added: newRewarded,
    ignored: incomingNumbers.filter(n => !newRewarded.includes(n)),
  });
}

