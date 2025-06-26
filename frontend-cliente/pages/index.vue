<template>
  <div>
    <HeaderTop :open="drawer" @toggle-drawer="drawer = !drawer" />
    <MenuDrawer :open="drawer" @close="drawer = false" />

    <div class="user-greeting">
      <template v-if="isLoggedIn && user && user.fullName">
        <div class="avatar">
          {{ initials(user.fullName) }}
        </div>
        <div>
          Hola, {{ firstName(user.fullName) }} 👋
        </div>
      </template>
    </div>
    <div class="section-title">Rifas destacadas</div>
    <div v-if="loading" class="loading">Cargando rifas...</div>
    <div v-else-if="error" class="error">Error al cargar rifas</div>
    <div v-else  style="max-width:600px;margin:auto;padding:0px 20px 0px 20px;">
      <FeaturedCard
        v-for="r in raffles"
        :key="r.id"
        :slug="r.slug"
        :img="r.imageMain"
        :cost="r.price"
        :text="r.description"
        :progress="r.percentSold"
        :progress-label="`${r.percentSold}% vendido`"
      />
      <div v-if="!raffles.length" class="empty">No hay rifas disponibles</div>
    </div>
    <NavbarBottom />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderTop from '~/components/HeaderTop.vue'
import MenuDrawer from '~/components/MenuDrawer.vue'
import FeaturedCard from '~/components/FeaturedCard.vue'
import NavbarBottom from '~/components/NavbarBottom.vue'
import { useAuth } from '~/composables/useAuth'
import { useRaffles } from '~/composables/useRaffles'

const drawer = ref(false)
const { isLoggedIn, user } = useAuth()
const { raffles, loading, error, fetchRaffles } = useRaffles()

onServerPrefetch(async () => {
  await fetchRaffles()
})

function initials(fullName) {
  if (!fullName) return 'LS'
  return fullName
    .split(' ')
    .map(n => n[0]?.toUpperCase())
    .join('')
    .substring(0, 2)
}

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

