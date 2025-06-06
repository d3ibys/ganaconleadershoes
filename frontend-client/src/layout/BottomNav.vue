<template>
  <nav class="nav-bottom">
    <div
      v-for="item in navItems"
      :key="item.key"
      class="nav-item"
      :class="{ active: active === item.key }"
      @click="go(item.key)"
    >
      <i :class="item.icon"></i>
      <span>{{ item.label }}</span>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  isAuth: Boolean,
  active: String,
})

const emit = defineEmits(['navigate'])

const navAuth = [
  { key: 'home', label: 'Inicio', icon: 'fas fa-home' },
  { key: 'raffles', label: 'Rifas', icon: 'fas fa-ticket-alt' },
  { key: 'tickets', label: 'Mis Tickets', icon: 'fas fa-receipt' },
  { key: 'dashboard', label: 'Panel', icon: 'fas fa-user' },
]
const navPublic = [
  { key: 'home', label: 'Inicio', icon: 'fas fa-home' },
  { key: 'raffles', label: 'Rifas', icon: 'fas fa-ticket-alt' },
  { key: 'register', label: 'Registrarse', icon: 'fas fa-user-plus' },
  { key: 'login', label: 'Iniciar sesión', icon: 'fas fa-sign-in-alt' },
]

const navItems = computed(() => (props.isAuth ? navAuth : navPublic))

function go(page) {
  emit('navigate', page)
}
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
  cursor: pointer;
  min-width: 60px;
}
.nav-item.active {
  color: #d3c423;
}
.nav-item i {
  font-size: 1.3rem;
  margin-bottom: 0.2rem;
}
</style>
