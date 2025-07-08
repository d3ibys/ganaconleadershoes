<template>
  <div class="top-buyers-container">
    <h1 class="title">🏆 Top 10 Compradores</h1>
    <p class="subtitle">
      Estos son los participantes con más boletos comprados hasta ahora. ¡Mientras más compres, más chances tienes de ganar
      y aparecer en este ranking!
    </p>

    <ul class="buyers-list">
      <li
        v-for="(buyer, index) in topBuyers"
        :key="index"
        class="buyer-item"
        :class="{
          first: index === 0,
          second: index === 1,
          third: index === 2
        }"
      >
        <span class="position">
          <font-awesome-icon v-if="(index <= 2)" icon="fa-solid fa-medal" :style="{ color: getMedalIcon(index) }" />
          <span v-if="index > 2">#{{ index + 1 }}</span>
        </span>
        <span class="name">{{ buyer.userName }}</span>
        <span class="tickets"></span>
      </li>
    </ul>

    <div class="cta">
      <p>¿Quieres aparecer en esta lista? Participa comprando más boletos en cualquiera de nuestras rifas activas.</p>
      <NuxtLink to="/" class="btn">Ir al inicio</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { TrophyIcon, StarIcon, SparklesIcon } from '@heroicons/vue/24/solid'
import { useRaffles } from '~/composables/useRaffles'

const { raffles, fetchRaffles } = useRaffles()

const res = await $fetch(`https://api.ganaconleadershoes.com/api/raffles`) || {}
let topBuyers = res[0].topTen

const getMedalIcon = (index) => {
  if (index === 0) return 'gold'
  if (index === 1) return 'lightgray'
  if (index === 2) return 'chocolate'
  return null
}
</script>

<style scoped>
.top-buyers-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #111;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(211, 196, 35, 0.2);
  color: white;
  animation: fadeIn 0.8s ease;
}
.title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 10px;
}
.subtitle {
  text-align: center;
  font-size: 14px;
  color: #ccc;
  margin-bottom: 30px;
}
.buyers-list {
  list-style: none;
  padding: 0;
}
.buyer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1a1a1a;
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  transition: transform 0.3s;
}
.buyer-item:hover {
  transform: scale(1.01);
  background: #222;
}
.position {
  width: 40px;
  display: flex;
  align-items: center;
}
.icon {
  width: 24px;
  height: 24px;
  color: #d3c423;
}
.name {
  flex: 1;
  margin-left: 10px;
}
.tickets {
  font-weight: bold;
  color: #d3c423;
}
.buyer-item.first {
  background: #2e2e00;
}
.buyer-item.second {
  background: #2d2d2d;
}
.buyer-item.third {
  background: #2b1e1e;
}
.cta {
  text-align: center;
  margin-top: 40px;
  color: #ccc;
}
.btn {
  display: inline-block;
  margin-top: 10px;
  background: #d3c423;
  color: #000;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  transition: background 0.3s;
}
.btn:hover {
  background: #f0e142;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

