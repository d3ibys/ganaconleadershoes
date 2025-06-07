<template>
  <nav class="nav-bottom">
    <NuxtLink
      v-for="item in menu"
      :key="item.label"
      :to="item.path"
      class="nav-item"
      :class="{ active: route.path === item.path }"
      :aria-label="item.label"
      :title="item.label"
    >
      <component :is="item.icon" class="nav-icon" />
      <span class="nav-label">{{ item.label }}</span>
    </NuxtLink>
    <!-- Botón de logout visible solo si está logueado -->
    <button
      v-if="isLoggedIn"
      @click="logout"
      class="nav-item nav-logout"
      aria-label="Cerrar sesión"
      title="Cerrar sesión"
    >
      <LogoutIcon class="nav-icon" />
      <span class="nav-label">Salir</span>
    </button>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

import { HomeIcon } from '@heroicons/vue/24/outline'
import { TicketIcon as RaffleIcon } from '@heroicons/vue/24/outline'
import { ReceiptPercentIcon as MyTicketsIcon } from '@heroicons/vue/24/outline'
import { UserCircleIcon as DashboardIcon } from '@heroicons/vue/24/outline'
import { UserPlusIcon as RegisterIcon } from '@heroicons/vue/24/outline'
import { ArrowRightStartOnRectangleIcon as LoginIcon } from '@heroicons/vue/24/outline'
import { ArrowRightOnRectangleIcon as LogoutIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const { isLoggedIn, logout } = useAuth()

const menu = computed(() =>
  isLoggedIn.value
    ? [
        { label: 'Inicio', icon: HomeIcon, path: '/' },
        { label: 'Rifas', icon: RaffleIcon, path: '/raffles' },
        { label: 'Mis Tickets', icon: MyTicketsIcon, path: '/my-tickets' },
        { label: 'Panel', icon: DashboardIcon, path: '/dashboard' }
      ]
    : [
        { label: 'Inicio', icon: HomeIcon, path: '/' },
        { label: 'Rifas', icon: RaffleIcon, path: '/raffles' },
        { label: 'Registrarse', icon: RegisterIcon, path: '/register' },
        { label: 'Iniciar sesión', icon: LoginIcon, path: '/login' }
      ]
)
</script>

<style scoped>
.nav-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #181818;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1.5px solid #222;
  padding: 0.6rem 0 0.3rem 0;
  z-index: 99;
  box-shadow: 0 0 16px 0 rgba(0,0,0,0.15);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #b3b3b3;
  background: none;
  border: none;
  outline: none;
  text-decoration: none;
  padding: 0 0.15rem;
  cursor: pointer;
  transition: color 0.18s, background 0.18s;
  font-size: 1.1rem;
  min-width: 44px;
  min-height: 44px;
  border-radius: 12px;
}

.nav-item.active,
.nav-item:focus,
.nav-item:hover {
  color: #f3cc23;
  background: #23231c;
}

.nav-icon {
  width: 1.7em;
  height: 1.7em;
  display: block;
  margin: 0 auto 0.01em auto;
}

.nav-label {
  font-size: 0.74em;
  font-weight: 500;
  margin-top: 0.09rem;
  letter-spacing: 0.01em;
  text-align: center;
}

.nav-logout {
  color: #ff4e4e;
  font-weight: 600;
  transition: color 0.2s, background 0.2s;
}
.nav-logout:hover,
.nav-logout:focus {
  color: #fff;
  background: #d32f2f;
}

@media (max-width: 480px) {
  .nav-label {
    font-size: 0.68em;
  }
  .nav-bottom {
    padding-bottom: 0.1rem;
  }
  .nav-icon {
    width: 1.3em;
    height: 1.3em;
  }
}
</style>
