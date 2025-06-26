<template>
  <div class="featured-card">
    <button @click="goToRoute('/buy-tickets/'+slug)" class="buy-btn full-card-btn">
      <div class="icon" align="center" v-if="img">
        <img :src="img" alt="Rifa" style="width:70%" />
      </div>
      <div class="icon" v-else-if="icon">
        <i :class="icon"></i>
      </div>
      <div class="text">{{ text }}</div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="progress-label">{{ progressLabel }}</div>
      <div class="footer">
        <div class="raffle-cost" v-if="cost !== undefined && cost !== null">
          {{ formatCurrency(cost) }}
        </div>
        <span class="buy-btn-label">Comprar ticket</span>
      </div>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  img: String,
  icon: String,
  text: String,
  progress: Number,
  progressLabel: String,
  cost: [Number, String],
  slug: String
})

function formatCurrency(val) {
  if (val === undefined || val === null) return ''
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'VES',
    maximumFractionDigits: 2
  }).format(val)
}

const goToRoute = (route) => {
  router.push(route);
};

</script>

<style scoped>
.featured-card {
  background: #111;
  border-radius: 1rem;
  margin: 1rem;
  color: #fff;
  box-shadow: 0 0 10px #cddc39;
  position: relative;
  overflow: hidden;
  /* Elimina el padding aquí ya que lo lleva el botón */
}

.full-card-btn {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
  min-height: 220px;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  background: transparent;
  cursor: pointer;
  position: relative;
  color: inherit;
  box-shadow: none;
  transition: filter 0.16s, box-shadow 0.16s;
  text-align: left;
}
.full-card-btn:focus,
.full-card-btn:hover {
  filter: brightness(1.04);
  box-shadow: 0 4px 16px #f3cc2370;
  outline: none;
}

.icon i {
  font-size: 2.5rem;
  color: var(--color-primary);
}
.progress-bar {
  background-color: #333;
  height: 8px;
  border-radius: 4px;
  margin-top: 1rem;
  overflow: hidden;
}
.progress {
  height: 100%;
  background-color: #cddc39;
  border-radius: 4px;
  transition: width 0.5s ease;
}
.progress-label {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #ccc;
  text-align: right;
}
.text {
  font-size: 0.95rem;
  line-height: 1.4;
  margin-top: 0.5rem;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1.2rem;
  gap: 0.45em;
  min-height: 70px;
  justify-content: flex-end;
}
.raffle-cost {
  font-size: 1.12rem;
  color: #f3cc23;
  font-weight: bold;
  letter-spacing: 0.01em;
}
.buy-btn-label {
  margin-top: 0.2em;
  background: linear-gradient(90deg, #f3cc23 70%, #cddc39 100%);
  color: #202020;
  font-weight: 700;
  border-radius: 0.7em;
  font-size: 1rem;
  padding: 0.35em 1.2em;
  box-shadow: 0 2px 8px #cddc3940;
  transition: filter 0.16s, box-shadow 0.16s;
  display: inline-block;
  width: 100%;
  text-align: center;
}
</style>
