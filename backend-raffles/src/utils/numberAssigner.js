// utils/numberAssigner.js
export const assignRandomNumbers = (totalNumbers, soldNumbers, quantity) => {
  const available = [];
  for (let i = 1; i <= totalNumbers; i++) {
    if (!soldNumbers.includes(i)) available.push(i);
  }

  if (available.length < quantity) throw new Error('No hay suficientes números disponibles');

  const assigned = [];
  while (assigned.length < quantity) {
    const randomIndex = Math.floor(Math.random() * available.length);
    assigned.push(available.splice(randomIndex, 1)[0]);
  }

  return assigned;
};
