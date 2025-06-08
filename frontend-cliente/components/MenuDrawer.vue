<template>
  <!-- Overlay -->
  <transition name="drawer-fade">
    <div
      v-if="open"
      class="drawer-overlay"
      @click.self="emitClose"
      aria-label="Cerrar menú lateral"
      tabindex="-1"
    />
  </transition>
  <!-- Drawer -->
  <transition name="drawer-slide">
    <aside v-if="open" class="drawer" role="navigation" aria-label="Menú principal">
      <button class="drawer-close" @click="emitClose" aria-label="Cerrar menú">
        <XMarkIcon class="icon-close" />
      </button>
      <nav class="drawer-nav">
        <NuxtLink
          v-for="item in menu"
          :key="item.label"
          :to="item.path"
          class="drawer-link"
          @click="emitClose"
        >
          <component :is="item.icon" class="drawer-link-icon" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </aside>
  </transition>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'

// Iconos Heroicons
import { XMarkIcon, HomeIcon, TicketIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  open: { type: Boolean, default: false }
})
const emit = defineEmits(['close'])

const { isLoggedIn } = useAuth()

const menu = computed(() =>
  isLoggedIn.value
    ? [
        { label: 'Inicio', icon: HomeIcon, path: '/' },
        { label: 'Rifas', icon: TicketIcon, path: '/raffles' },
        { label: 'Panel', icon: UserCircleIcon, path: '/dashboard' },
        { label: 'Salir', icon: ArrowRightOnRectangleIcon, path: '/logout' }
      ]
    : [
        { label: 'Inicio', icon: HomeIcon, path: '/' },
        { label: 'Rifas', icon: TicketIcon, path: '/raffles' },
        { label: 'Iniciar sesión', icon: UserCircleIcon, path: '/login' },
        { label: 'Registrarse', icon: ArrowRightOnRectangleIcon, path: '/register' }
      ]
)

function emitClose() {
  emit('close')
}

// Bloquear scroll del body cuando el drawer está abierto
watch(
  () => props.open,
  val => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = val ? 'hidden' : ''
    }
  }
)
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.22);
  z-index: 101;
  transition: background 0.18s;
}
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 265px;
  background: #181818;
  box-shadow: 2px 0 16px 0 rgba(0,0,0,0.18);
  z-index: 102;
  display: flex;
  flex-direction: column;
  animation: none;
  padding-top: 1.2rem;
}
.drawer-close {
  background: none;
  border: none;
  color: #b3b3b3;
  font-size: 1.5rem;
  padding: 0.25rem 0.65rem;
  align-self: flex-end;
  cursor: pointer;
  transition: color 0.19s;
}
.drawer-close:hover {
  color: #f3cc23;
}
.icon-close {
  width: 2rem;
  height: 2rem;
}
.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-top: 1.7rem;
}
.drawer-link {
  display: flex;
  align-items: center;
  padding: 0.85rem 1.3rem;
  font-size: 1.1rem;
  color: #cfcfcf;
  text-decoration: none;
  font-weight: 500;
  border-radius: 7px;
  gap: 1.1em;
  transition: background 0.17s, color 0.17s;
}
.drawer-link-icon {
  width: 1.5em;
  height: 1.5em;
}
.drawer-link:hover,
.drawer-link:focus {
  background: #23231c;
  color: #f3cc23;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.27s cubic-bezier(.63,-0.01,.46,1.01);
}
.drawer-slide-enter-from {
  transform: translateX(-105%);
}
.drawer-slide-enter-to {
  transform: translateX(0);
}
.drawer-slide-leave-from {
  transform: translateX(0);
}
.drawer-slide-leave-to {
  transform: translateX(-105%);
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.19s;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}
.drawer-fade-enter-to,
.drawer-fade-leave-from {
  opacity: 1;
}

@media (max-width: 480px) {
  .drawer {
    width: 76vw;
    min-width: 210px;
    max-width: 96vw;
  }
}
</style>
