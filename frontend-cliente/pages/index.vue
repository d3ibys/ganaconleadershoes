<template>
  <div>
    <HeaderTop @toggle-drawer="drawer = true" />
    <MenuDrawer :open="drawer" @close="drawer = false" />

    <div class="user-greeting">
      <div class="avatar">LS</div>
      <div>Hola, Deibys 👋</div>
    </div>

    <CarouselBanners />

    <div class="section-title">Rifas destacadas</div>

    <FeaturedCard
      img="images/ImagenPromocion.png"
      text="Gana Una 4Runner 2022 + Una moto EK 150 0KM + $1,000 en efectivo"
      :progress="75"
      progress-label="75% vendido"
    />
    <FeaturedCard
      icon="fas fa-home"
      text="Gana Un Apto en Margarita + Una moto EK 150 0KM + $1,000 en efectivo"
      :progress="93.5"
      progress-label="93.5% vendido"
    />

    <NavbarBottom />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderTop from '~/components/HeaderTop.vue'
import MenuDrawer from '~/components/MenuDrawer.vue'
import CarouselBanners from '~/components/CarouselBanners.vue'
import FeaturedCard from '~/components/FeaturedCard.vue'
import NavbarBottom from '~/components/NavbarBottom.vue'

const drawer = ref(false)
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
  background-color: var(--color-primary);
  color: #000;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
}
.section-title {
  padding: 0 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
</style>
