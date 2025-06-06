<template>
  <nav class="nav-bottom" v-if="isAuthenticated">
    <NuxtLink 
      v-for="item in menuItems" 
      :key="item.name"
      :to="item.route"
      class="nav-item"
      :class="{ active: currentRoute === item.route }"
    >
      <i :class="item.icon"></i>
      <span>{{ item.name }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup>
const route = useRoute();
const { isAuthenticated } = storeToRefs(useAuthStore());

const currentRoute = computed(() => route.path);

const menuItems = [
  { name: 'Inicio', icon: 'fas fa-home', route: '/' },
  { name: 'Rifas', icon: 'fas fa-ticket-alt', route: '/rifas' },
  { name: 'Mis Tickets', icon: 'fas fa-receipt', route: '/tickets' },
  { name: 'Panel', icon: 'fas fa-user', route: '/panel' }
];
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
  color: var(--color-secondary);
  text-decoration: none;
}

.nav-item.active {
  color: var(--color-primary);
}

.nav-item i {
  font-size: 1.3rem;
  margin-bottom: 0.2rem;
}
</style>
