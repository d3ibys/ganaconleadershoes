<template>
  <div class="raffle-page">
    <PublicHeader />

    <div v-if="loading" class="loading">
      <div class="loading-spinner">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
      Cargando detalles de la rifa...
    </div>
    
    <div v-else-if="error" class="error">
      <i class="fas fa-exclamation-circle"></i>
      {{ error }}
    </div>
    
    <div v-else-if="currentRaffle" class="raffle-detail">
      <!-- Sección de imagen -->
      <div class="image-container">
        <img 
          v-if="currentRaffle.imageUrl" 
          :src="currentRaffle.imageUrl" 
          :alt="currentRaffle.title"
          class="raffle-image"
        />
        <div v-else class="placeholder-image">
          <i class="fas fa-image"></i>
        </div>
      </div>
      
      <div class="raffle-info">
        <!-- Encabezado -->
        <div class="header-section">
          <h1 class="title">{{ currentRaffle.title }}</h1>
          <div class="status-badge" :class="currentRaffle.status">
            {{ getStatusText(currentRaffle.status) }}
          </div>
        </div>

        <!-- Información de precios y disponibilidad -->
        <div class="price-info">
          <div class="ticket-price">
            <i class="fas fa-tag"></i>
            <span>${{ currentRaffle.ticketPrice }}</span>
          </div>
          <div class="tickets-available">
            <i class="fas fa-ticket-alt"></i>
            <span>{{ currentRaffle.totalTickets - currentRaffle.ticketsSold }} disponibles</span>
          </div>
        </div>

        <!-- Barra de progreso -->
        <div class="progress-section">
          <div class="progress-bar">
            <div 
              class="progress" 
              :style="{ width: `${currentRaffle.progress}%` }"
            ></div>
          </div>
          <div class="progress-stats">
            <span class="progress-label">
              {{ currentRaffle.progress }}% vendido
            </span>
            <span class="tickets-sold">
              {{ currentRaffle.ticketsSold }}/{{ currentRaffle.totalTickets }} tickets
            </span>
          </div>
        </div>

        <!-- Descripción -->
        <div class="description">
          <h2>Descripción</h2>
          <p>{{ currentRaffle.description }}</p>
        </div>

        <!-- Detalles del sorteo -->
        <div class="raffle-details">
          <h2>Detalles del Sorteo</h2>
          <div class="detail-grid">
            <div class="detail-item">
              <i class="fas fa-calendar"></i>
              <div class="detail-content">
                <span class="detail-label">Fecha del sorteo</span>
                <span class="detail-value">{{ formatDate(currentRaffle.drawDate) }}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <i class="fas fa-clock"></i>
              <div class="detail-content">
                <span class="detail-label">Hora del sorteo</span>
                <span class="detail-value">{{ formatTime(currentRaffle.drawDate) }}</span>
              </div>
            </div>

            <div class="detail-item">
              <i class="fas fa-trophy"></i>
              <div class="detail-content">
                <span class="detail-label">Premio</span>
                <span class="detail-value">{{ currentRaffle.prize }}</span>
              </div>
            </div>

            <div class="detail-item">
              <i class="fas fa-user-check"></i>
              <div class="detail-content">
                <span class="detail-label">Organizador</span>
                <span class="detail-value">{{ currentRaffle.organizer }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Términos y condiciones -->
        <div class="terms-section" v-if="currentRaffle.terms">
          <h2>Términos y Condiciones</h2>
          <div class="terms-content">
            {{ currentRaffle.terms }}
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="action-buttons" v-if="currentRaffle.status === 'active'">
          <button 
            class="buy-button"
            @click="buyTicket"
            :disabled="!canBuyTicket"
          >
            <i class="fas fa-shopping-cart"></i>
            Comprar Ticket
          </button>
          
          <button 
            class="share-button"
            @click="shareRaffle"
          >
            <i class="fas fa-share-alt"></i>
            Compartir
          </button>
        </div>
      </div>
    </div>

    <NavBottom />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRaffleStore } from '~/stores/raffle';
import { useAuthStore } from '~/stores/auth';

const route = useRoute();
const router = useRouter();
const raffleStore = useRaffleStore();
const authStore = useAuthStore();

const { currentRaffle, loading, error } = storeToRefs(raffleStore);
const { isAuthenticated } = storeToRefs(authStore);

const canBuyTicket = computed(() => {
  if (!currentRaffle.value) return false;
  return currentRaffle.value.status === 'active' && 
         currentRaffle.value.ticketsSold < currentRaffle.value.totalTickets;
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusText = (status) => {
  const statusMap = {
    'active': 'Activa',
    'completed': 'Finalizada',
    'pending': 'Próximamente',
    'cancelled': 'Cancelada'
  };
  return statusMap[status] || status;
};

const buyTicket = async () => {
  if (!isAuthenticated.value) {
    // Guardar la URL actual para redireccionar después del login
    localStorage.setItem('redirectAfterLogin', route.fullPath);
    router.push('/login');
    return;
  }

  try {
    // Implementar lógica de compra
    await raffleStore.buyTicket(currentRaffle.value._id);
    // Mostrar mensaje de éxito o redireccionar a página de pago
  } catch (error) {
    console.error('Error al comprar ticket:', error);
    // Manejar error
  }
};

const shareRaffle = async () => {
  const shareData = {
    title: currentRaffle.value.title,
    text: `¡Mira esta increíble rifa: ${currentRaffle.value.title}!`,
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback para navegadores que no soportan Web Share API
      await navigator.clipboard.writeText(window.location.href);
      // Mostrar mensaje de éxito
    }
  } catch (error) {
    console.error('Error al compartir:', error);
  }
};

onMounted(async () => {
  await raffleStore.fetchRaffleById(route.params.id);
});
</script>

<style scoped>
.raffle-page {
  min-height: 100vh;
  padding-bottom: 80px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--color-secondary);
}

.loading-spinner {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.error {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #f44336;
  gap: 0.5rem;
}

.raffle-detail {
  max-width: 800px;
  margin: 0 auto;
}

.image-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
  margin-bottom: 1rem;
}

.raffle-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius);
}

.placeholder-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
  color: var(--color-secondary);
  font-size: 3rem;
  border-radius: var(--radius);
}

.raffle-info {
  background: #111;
  border-radius: var(--radius);
  padding: 1.5rem;
  margin: 1rem;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text);
  flex: 1;
  margin-right: 1rem;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 600;
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

.price-info {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
}

.ticket-price, .tickets-available {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ticket-price {
  color: var(--color-primary);
  font-size: 1.25rem;
  font-weight: bold;
}

.tickets-available {
  color: var(--color-secondary);
}

.progress-section {
  margin: 1.5rem 0;
}

.progress-bar {
  background-color: #333;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.progress-label {
  color: var(--color-primary);
}

.tickets-sold {
  color: var(--color-secondary);
}

.description, .raffle-details, .terms-section {
  margin: 1.5rem 0;
}

h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.description p {
  line-height: 1.6;
  color: var(--color-secondary);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #1a1a1a;
  border-radius: var(--radius);
}

.detail-item i {
  color: var(--color-primary);
  font-size: 1.25rem;
}

.detail-content {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.875rem;
  color: var(--color-secondary);
}

.detail-value {
  color: var(--color-text);
  margin-top: 0.25rem;
}

.terms-content {
  padding: 1rem;
  background: #1a1a1a;
  border-radius: var(--radius);
  font-size: 0.875rem;
  color: var(--color-secondary);
  line-height: 1.6;
}

.action-buttons {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  margin-top: 2rem;
}

.buy-button, .share-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.buy-button {
  background-color: var(--color-primary);
  color: #000;
}

.buy-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.share-button {
  background-color: #1a1a1a;
  color: var(--color-text);
}

.buy-button:hover:not(:disabled) {
  opacity: 0.9;
}

.share-button:hover {
  background-color: #222;
}

@media (max-width: 640px) {
  .raffle-info {
    margin: 0.5rem;
    padding: 1rem;
  }

  .title {
    font-size: 1.25rem;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
