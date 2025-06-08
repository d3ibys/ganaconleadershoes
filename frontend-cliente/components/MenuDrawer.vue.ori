<template>
  <Transition name="slide">
    <div v-if="open" class="drawer">
      <div class="drawer-content">
        <button class="close-btn" @click="emit('close')">
          <i class="fas fa-times"></i>
        </button>
        <ul>
          <li v-for="item in items" :key="item.label">
            <NuxtLink :to="item.path" @click="$emit('close')">
              <i :class="item.icon" /> {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const items = [
  { label: 'Inicio', icon: 'fas fa-home', path: '/' },
  { label: 'Rifas', icon: 'fas fa-ticket-alt', path: '/raffles' },
  { label: 'Términos', icon: 'fas fa-file-alt', path: '/terms' },
  { label: 'Soporte', icon: 'fas fa-headset', path: '/support' }
]
</script>

<style scoped>
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
}
.drawer-content {
  background: #111;
  width: 75%;
  max-width: 300px;
  height: 100%;
  padding: 1rem;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.5);
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #d3c423;
  margin-bottom: 1rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 1rem 0;
}
a {
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>

