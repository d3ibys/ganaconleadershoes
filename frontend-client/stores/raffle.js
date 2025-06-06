// stores/raffle.js
import { defineStore } from 'pinia';
import { createRaffleService } from '~/services/raffleService';

export const useRaffleStore = defineStore('raffle', {
  state: () => ({
    raffles: [],
    loading: false,
    error: null,
    currentRaffle: null
  }),

  getters: {
    featuredRaffles: (state) => {
      return state.raffles.filter(raffle => raffle.featured);
    },
    activeRaffles: (state) => {
      return state.raffles.filter(raffle => raffle.status === 'active');
    }
  },

  actions: {
    async fetchRaffles() {
      this.loading = true;
      try {
        // Usamos useRuntimeConfig dentro de una acción del store
        const config = useRuntimeConfig();
        const raffleService = createRaffleService(config.public.apiBase);
        
        const raffles = await raffleService.getAllRaffles();
        this.raffles = raffles.map(raffle => ({
          ...raffle,
          progress: raffleService.calculateProgress(
            raffle.ticketsSold,
            raffle.totalTickets
          )
        }));
        this.error = null;
      } catch (error) {
        this.error = 'Error al cargar las rifas';
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchRaffleById(id) {
      this.loading = true;
      try {
        const config = useRuntimeConfig();
        const raffleService = createRaffleService(config.public.apiBase);
        
        const raffle = await raffleService.getRaffleById(id);
        this.currentRaffle = {
          ...raffle,
          progress: raffleService.calculateProgress(
            raffle.ticketsSold,
            raffle.totalTickets
          )
        };
        this.error = null;
      } catch (error) {
        this.error = 'Error al cargar la rifa';
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    },

    async buyTicket(raffleId) {
      try {
        const config = useRuntimeConfig();
        const raffleService = createRaffleService(config.public.apiBase);
        // Implementar lógica de compra
      } catch (error) {
        console.error('Error buying ticket:', error);
        throw error;
      }
    }
  }
});
