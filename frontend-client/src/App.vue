<template>
  <div>
    <HeaderBar
      :user="user"
      @open-menu="showMenu = true"
      @open-help="openHelp"
    />
    <MenuDrawer
      v-if="showMenu"
      @close="showMenu = false"
    />
    <router-view />
    <BottomNav
      :is-auth="!!user"
      :active="activeNav"
      @navigate="navigate"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderBar from './layout/HeaderBar.vue'
import MenuDrawer from './layout/MenuDrawer.vue'
import BottomNav from './layout/BottomNav.vue'

// Simulación de usuario autenticado
// Reemplazar por store o lógica real de autenticación
const user = ref({
  name: 'Deibys',
  initials: 'LS',
  avatar: null,
})

const route = useRoute()
const router = useRouter()
const showMenu = ref(false)

const navMap = {
  '/': 'home',
  '/rifas': 'raffles',
  '/registro': 'register',
  '/login': 'login',
  '/tickets': 'tickets',
  '/dashboard': 'dashboard',
}

const activeNav = computed(() => {
  return navMap[route.path] || ''
})

function navigate(page) {
  switch (page) {
    case 'home':
      router.push('/')
      break
    case 'raffles':
      router.push('/rifas')
      break
    case 'register':
      router.push('/registro')
      break
    case 'login':
      router.push('/login')
      break
    case 'tickets':
      router.push('/tickets')
      break
    case 'dashboard':
      router.push('/dashboard')
      break
  }
}

function openHelp() {
  // Aquí puedes abrir modal o redirigir a soporte
  alert('Soporte')
}
</script>

<style>
body {
  background-color: #000;
}
</style>
