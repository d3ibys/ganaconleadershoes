const Raffle = require('../models/raffle.model');

// Crear una nueva rifa
exports.createRaffle = async (req, res) => {
  try {
    const raffle = new Raffle(req.body);
    await raffle.save();
    res.status(201).json(raffle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todas las rifas
exports.getRaffles = async (req, res) => {
  try {
    const raffles = await Raffle.find();





  // Computado que agrega el porcentaje vendido a cada rifa
  const rafflesWithPercentSold = computed(() =>
    (raffles.value || []).map(r => ({
      ...r,
      percentSold: r.totalNumbers && r.soldNumbers
        ? Math.round((r.soldNumbers / r.totalNumbers) * 100)
        : 0
    }))
  )


const algo = 'Deibys'


    res.status(200).json(algo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
