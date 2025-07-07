export const assignRandomNumbers = (totalNumbers, soldNumbers, quantity) => {
  // Convertimos los vendidos a Set numérico para comparar contra números reales
  const soldSet = new Set(
    soldNumbers.map(num => parseInt(num, 10))
  );

  // Crear lista de disponibles como números (1 a totalNumbers), excluyendo los vendidos
  const available = [];
  for (let i = 1; i <= totalNumbers; i++) {
    if (!soldSet.has(i)) {
      available.push(i);
    }
  }

  if (available.length < quantity) {
    throw new Error(
      `Solo hay ${available.length} números disponibles, pero se solicitaron ${quantity}`
    );
  }

  // Mezclar los disponibles (Fisher-Yates)
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }

  // Tomar los primeros 'quantity' y devolverlos como strings con pad de 4 dígitos
  return available
    .slice(0, quantity)
    .map(n => n.toString().padStart(4, '0'));
};

