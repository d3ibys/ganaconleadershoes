<template>
  <div class="carousel" ref="carousel">
    <div class="banner" v-for="(banner, index) in banners" :key="index">
      {{ banner.text }}
    </div>
  </div>
</template>

<script setup>
const banners = ref([
  { text: '¡Gana una moto 0KM!' },
  { text: 'Participa desde $1' },
  { text: 'Invita y gana más' }
]);

const carousel = ref(null);
let index = 0;

onMounted(() => {
  setInterval(() => {
    index = (index + 1) % banners.value.length;
    const bannerElements = carousel.value.querySelectorAll('.banner');
    const scrollAmount = bannerElements[index].offsetLeft - carousel.value.offsetLeft;
    carousel.value.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }, 3000);
});
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
