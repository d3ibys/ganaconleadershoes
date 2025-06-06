<template>
  <div>
    <div class="user-greeting" v-if="user">
      <div class="avatar">{{ user.initials }}</div>
      <div>Hola, {{ user.name }} 👋</div>
    </div>

    <div class="carousel" ref="carousel">
      <div class="banner" v-for="(banner, idx) in banners" :key="idx">{{ banner }}</div>
    </div>

    <div class="section-title">Rifas destacadas</div>

    <FeaturedRaffleCard
      v-for="(raffle, idx) in featured"
      :key="idx"
      :icon="raffle.icon"
      :image="raffle.image"
      :text="raffle.text"
      :progress="raffle.progress"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FeaturedRaffleCard from '../components/FeaturedRaffleCard.vue'

// Simulación de usuario autenticado, cambiar por store real
const user = ref({
  name: 'Deibys',
  initials: 'LS',
  avatar: null,
})

const banners = [
  '¡Gana una moto 0KM!',
  'Participa desde $1',
  'Invita y gana más',
]

const featured = [
  {
    image: '/ImagenPromocion.png',
    text: 'Gana Una 4Runner 2022 + Una moto EK 150 0KM + $1,000 en efectivo',
    progress: 75,
  },
  {
    icon: 'fas fa-home',
    text: 'Gana Un Apto en Margarita + Una moto EK 150 0KM + $1,000 en efectivo',
    progress: 93.5,
  }
]

const carousel = ref(null)

onMounted(() => {
  let index = 0
  setInterval(() => {
    index = (index + 1) % banners.length
    const node = carousel.value
    if (!node) return
    const bannerEls = node.querySelectorAll('.banner')
    const scrollAmount = bannerEls[index].offsetLeft - node.offsetLeft
    node.scrollTo({ left: scrollAmount, behavior: 'smooth' })
  }, 3000)
})
</script>

<style scoped>
.user-greeting {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 1rem;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d3c423;
  color: #000;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
}

.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-left: 1rem;
  gap: 1rem;
  margin-bottom: 1.5rem;
  scroll-behavior: smooth;
}
.carousel::-webkit-scrollbar {
  display: none;
}
.banner {
  min-width: 85%;
  height: 120px;
  background: linear-gradient(45deg, #d3c423, #fff700);
  border-radius: 14px;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.section-title {
  padding: 0 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
</style>
