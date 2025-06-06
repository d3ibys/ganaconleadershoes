<template>
  <div class="featured-card" @click="navigateToRaffle">
    <div class="icon" align="center" v-if="raffle.imageUrl">
      <img :src="raffle.imageUrl" :alt="raffle.title" style="width:70%"/>
    </div>
    <div class="status-badge" :class="raffle.status">
      {{ getStatusText(raffle.status) }}
    </div>
    <div class="text">{{ raffle.title }}</div>
    <div class="price">Precio: ${{ raffle.ticketPrice }}</div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: `${raffle.progress}%` }"></div>
    </div>
    <div class="progress-info">
      <span class="progress-label">{{ raffle.progress }}% vendido</span>
      <span class="tickets-left">
        {{ raffle.totalTickets - raffle.ticketsSold }} tickets disponibles
      </span>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

const props = defineProps({
  raffle: {
    type: Object,
    required: true
  }
});

const getStatusText = (status) => {
  const statusMap = {
    'active': 'Activa',
    'completed': 'Finalizada',
    'pending': 'Próximamente',
    'cancelled': 'Cancelada'
  };
  return statusMap[status] || status;
};

const navigateToRaffle = () => {
  router.push(`/raffle/${props.raffle._id}`);
};
</script>

<style scoped>
.featured-card {
  background: #111;
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem;
  color: #fff;
  box-shadow: 0 0 10px #cddc39;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.featured-card:hover {
  transform: scale(1.02);
}

.status-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius);
  font-size: 0.8rem;
  font-weight: bold;
}

.status-badge.active {
  background-color: var(--color-primary);
  color: #000;
}

.status-badge.completed {
  background-color: #4CAF50;
  color: #fff;
}

.status-badge.pending {
  background-color: #2196F3;
  color: #fff;
}

.status-badge.cancelled {
  background-color: #f44336;
  color: #fff;
}

.price {
  color: var(--color-primary);
  font-weight: bold;
  margin: 0.5rem 0;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;
  font-size: 0.85rem;
}

.tickets-left {
  color: var(--color-secondary);
}

/* ... estilos anteriores ... */
</style>
