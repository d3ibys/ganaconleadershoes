<template>
  <div class="ticket-container">
    <div class="ticket">
      <!-- Header -->
      <div class="ticket-header">
        <!-- Nombre y Cédula -->
        <div class="user-info">
          <h2>{{ nombre }}</h2>
          <p>{{ cedula }}</p>
        </div>

        <!-- Logo y Texto -->
        <div class="logo-section">
          <div class="logo-circle"><img src="/images/logo.png" alt="Logo" /></div>
          <p class="brand-text">Juega y gana con Leader Shoes</p>
        </div>

        <!-- Número Destacado -->
        <div class="highlight-number">
          <div class="number-box">{{ numero }}</div>
          <p class="number-label">Número destacado</p>
        </div>
      </div>

      <!-- Info del sorteo -->
      <div class="raffle-info">
        <h3>{{ titulo }}</h3>
        <h3><span>{{ tituloResaltado }}</span></h3>
        <p>{{ detalle }}</p>
      </div>

      <!-- Lista de Números -->
      <div class="number-list">
        <div v-for="n in 5" :key="n" class="number-item">
          {{ String(n).padStart(4, '0') }}
        </div>
      </div>

      <!-- UUID y código -->
      <div class="uuid-section">
        <p>UUID: {{ uuid }}</p>
        <div class="uuid-bar"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nombre: String,
  cedula: String,
  titulo: String,
  tituloResaltado: String,
  detalle: String,
  uuid: String,
  numero: String
})
</script>

<style scoped>
.ticket-container {
  display: flex;
  justify-content: center;
  background-color: #1f2937;
  padding: 2rem 1rem;
}
.ticket {
  width: 100%;
  max-width: 1280px;
  background-color: #000;
  border-top: 4px solid #facc15;
  border-bottom: 4px solid #facc15;
  border-radius: 1rem;
  padding: 1.5rem;
  color: white;
  background-image: repeating-linear-gradient(126deg, rgb(255 215 0 / 10%) 0px, rgb(255 215 0 / 8%) 1.5px, #00000014 1px, #000000b3 7px);
}
.ticket-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}
@media (min-width: 768px) {
  .ticket-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
.user-info h2 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #facc15;
}
.user-info p {
  font-size: 0.875rem;
  color: #d1d5db;
}
.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo-circle {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: #facc15;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}
.logo-circle img {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: #facc15;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}
.brand-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #facc15;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.highlight-number {
  text-align: center;
}
.number-box {
  background-color: white;
  color: black;
  font-size: 1.875rem;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
.number-label {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.5rem;
}
.raffle-info {
  text-align: center;
  margin-bottom: 1.5rem;
}
.raffle-info h3 {
  font-size: 1.5rem;
  font-weight: bold;
}
.raffle-info h3 span {
  color: #facc15;
}
.raffle-info p {
  font-size: 0.875rem;
  color: #9ca3af;
  margin-top: 0.25rem;
}
.number-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  background-color: #1f2937;
  padding: 1rem;
  border-radius: 0.5rem;
}
@media (min-width: 640px) {
  .number-list {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (min-width: 768px) {
  .number-list {
    grid-template-columns: repeat(10, 1fr);
  }
}
.number-item {
  background-color: white;
  color: black;
  font-weight: 600;
  text-align: center;
  padding: 0.25rem 0;
  border-radius: 0.25rem;
}
.uuid-section {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.75rem;
  color: #9ca3af;
}
.uuid-bar {
  margin-top: 0.5rem;
  width: 100%;
  height: 0.5rem;
  background-color: #facc15;
}
</style>

