<template>
  <nav class="nav-bottom">
    <div
      v-for="item in menu"
      :key="item.label"
      class="nav-item"
      :class="{ active: route.path === item.path }"
    >
      <NuxtLink :to="item.path">
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const route = useRoute()

// Simula si está logeado (puedes reemplazar luego con auth real)
const isLoggedIn = ref(false)

const menu = computed(() =>
  isLoggedIn.value
    ? [
        { label: 'Inicio', icon: 'fas fa-home', path: '/' },
        { label: 'Rifas', icon: 'fas fa-ticket-alt', path: '/raffles' },
        { label: 'Mis Tickets', icon: 'fas fa-receipt', path: '/my-tickets' },
        { label: 'Panel', icon: 'fas fa-user', path: '/dashboard' }
      ]
    : [
        { label: 'Inicio', icon: 'fas fa-home', path: '/' },
        { label: 'Rifas', icon: 'fas fa-ticket-alt', path: '/raffles' },
        { label: 'Registrarse', icon: 'fas fa-user-plus', path: '/register' },
        { label: 'Iniciar sesión', icon: 'fas fa-sign-in-alt', path: '/login' }
      ]
)
</script>

<style scoped>
.nav-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #111;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #222;
  padding: 0.5rem 0;
  z-index: 99;
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  color: #999;
}
.nav-item.active,
.nav-item:hover {
  color: #d3c423;
}
.nav-item i {
  font-size: 1.3rem;
  margin-bottom: 0.2rem;
}
</style>

