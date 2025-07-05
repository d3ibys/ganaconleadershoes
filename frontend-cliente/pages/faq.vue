<template>
  <section class="faq-container">
    <h2 class="faq-title">Preguntas Frecuentes</h2>
    <div class="faq-list">
      <div class="faq-item">
        <input type="checkbox" id="faq1" class="faq-toggle">
        <label for="faq1" class="faq-question">¿Cuándo se realiza el sorteo?</label>
        <div class="faq-answer">
          El sorteo se realizará cuando se vendan el 100% de los números disponibles.
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq2" class="faq-toggle">
        <label for="faq2" class="faq-question">¿Cómo compro un número?</label>
        <div class="faq-answer">
          Debes registrarte en la plataforma, seleccionar la rifa que te interese y hacer clic en "Comprar número".
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq3" class="faq-toggle">
        <label for="faq3" class="faq-question">¿Cómo sé si gané?</label>
        <div class="faq-answer">
          Se anunciará al ganador en la misma página de la rifa y también se notificará por correo electrónico.
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-container {
  max-width: 700px;
  margin: 50px auto;
  padding: 20px;
  background: #111;
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(211, 196, 35, 0.3);
  font-family: 'Segoe UI', sans-serif;
}

.faq-title {
  text-align: center;
  font-size: 2rem;
  color: #d3c423;
  margin-bottom: 30px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  border: 1px solid #444;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.faq-toggle {
  display: none;
}

.faq-question {
  display: block;
  padding: 15px 20px;
  background: #1b1b1b;
  cursor: pointer;
  font-weight: bold;
  position: relative;
  transition: background 0.3s;
}

.faq-question::after {
  content: '+';
  position: absolute;
  right: 20px;
  font-size: 20px;
  transition: transform 0.3s;
}

.faq-toggle:checked + .faq-question::after {
  content: '-';
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  background: #222;
  padding: 0 20px;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.faq-toggle:checked ~ .faq-answer {
  max-height: 300px;
  padding: 15px 20px;
}
</style>

