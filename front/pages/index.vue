<template>
  <div class="home">
    <CarouselBanners />
    <div class="section-title">Rifas destacadas</div>

    <FeaturedCard
      v-for="(raffle, index) in featuredRaffles"
      :key="index"
      :raffle="raffle"
    />
  </div>
</template>

<script setup>
import CarouselBanners from '@/components/CarouselBanners.vue'
import FeaturedCard from '@/components/FeaturedCard.vue'

const featuredRaffles = [
  {
    title: 'Gana una 4Runner 2022 + Moto EK 150 + $1,000',
    img: 'ImagenPromocion.png',
    progress: 75
  },
  {
    title: 'Gana un Apto en Margarita + Moto EK 150 + $1,000',
    icon: 'fa-home',
    progress: 93.5
  }
]
</script>

<style scoped>
.section-title {
  padding: 0 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
</style>

