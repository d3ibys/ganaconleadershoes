<template>
  <div>
    <HeaderTop @toggle-drawer="drawer = true" />
    <MenuDrawer :open="drawer" @close="drawer = false" />

    <div class="user-greeting">
     <template v-if="isLoggedIn && user && user.fullName">
      <div class="avatar">
        <!-- Avatar dinámico: iniciales si logueado, LS si no -->
          {{ initials(user.fullName) }}
      </div>
     </template>
      <div>
        <!-- Saludo personalizado -->
        <template v-if="isLoggedIn && user && user.fullName">
          Hola, {{ firstName(user.fullName) }} 👋
        </template>
      </div>
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
import { useAuth } from '~/composables/useAuth'

const drawer = ref(false)
const { isLoggedIn, user } = useAuth()

/**
 * Obtiene las iniciales del nombre completo
 */
function initials(fullName) {
  if (!fullName) return 'LS'
  return fullName
    .split(' ')
    .map(n => n[0]?.toUpperCase())
    .join('')
    .substring(0, 2)
}

/**
 * Obtiene el primer nombre para el saludo
 */
function firstName(fullName) {
  if (!fullName) return ''
  return fullName.split(' ')[0]
}
</script>

<style scoped>
.user-greeting {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 1rem;
  margin-top: 15px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-primary, #f3cc23);
  color: #000;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  font-size: 1.15rem;
  letter-spacing: 0.03em;
  box-shadow: 0 2px 8px #0001;
}
.section-title {
  padding: 0 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.saludo-link {
  color: var(--color-primary, #f3cc23);
  font-weight: 600;
  margin: 0 0.1em;
  text-decoration: underline;
  transition: color 0.18s;
}
.saludo-link:hover {
  color: #ceb800;
}
</style>
