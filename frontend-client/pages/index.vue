<template>
  <div>
    <PublicHeader />
    
    <div class="user-greeting" v-if="isAuthenticated">
      <div class="avatar">{{ userInitials }}</div>
      <div>Hola, {{ username }} 👋</div>
    </div>

    <BaseCarousel />

    <!-- Sección de rifas destacadas -->
    <div class="section-title">Rifas destacadas</div>
    <div v-if="loading" class="loading">
      Cargando rifas...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <template v-else>
      <RaffleCard
        v-for="raffle in featuredRaffles"
        :key="raffle._id"
        :raffle="raffle"
      />
    </template>

    <!-- Sección de rifas activas -->
    <div class="section-title">Rifas activas</div>
    <template v-if="!loading && !error">
      <RaffleCard
        v-for="raffle in activeRaffles"
        :key="raffle._id"
        :raffle="raffle"
      />
    </template>

    <NavBottom />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';
import { useRaffleStore } from '~/stores/raffle';

const authStore = useAuthStore();
const raffleStore = useRaffleStore();

const { isAuthenticated, username } = storeToRefs(authStore);
const { featuredRaffles, activeRaffles, loading, error } = storeToRefs(raffleStore);

const userInitials = computed(() => {
  return username.value
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

// Cargar las rifas al montar el componente
onMounted(async () => {
  await raffleStore.fetchRaffles();
});
</script>

<style scoped>
.loading, .error {
  text-align: center;
  padding: 2rem;
  color: var(--color-secondary);
}

.error {
  color: #f44336;
}

/* ... estilos anteriores ... */
</style>
