<template>
  <div
    ref="carousel"
    class="carousel"
    tabindex="0"
    @mouseenter="pause = true"
    @mouseleave="pause = false"
  >
    <div class="banner">¡Gana una moto 0KM!</div>
    <div class="banner">Participa desde $1</div>
    <div class="banner">Invita y gana más</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
const carousel = ref(null)
const pause = ref(false)
let interval = null

onMounted(() => {
  const banners = carousel.value.querySelectorAll('.banner')
  let index = 0
  interval = setInterval(() => {
    if (pause.value) return
    index = (index + 1) % banners.length
    const scrollAmount = 100 //banners[index].offsetLeft - carousel.value.offsetLeft
    //carousel.value.scrollTo({ left: scrollAmount, behavior: "smooth" })
  }, 3000)
})
</script>

<style scoped>
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
  background: linear-gradient(45deg, var(--color-primary), #fff700);
  border-radius: var(--radius);
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
</style>
