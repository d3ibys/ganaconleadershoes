// services/raffleService.js
import axios from 'axios';

// En lugar de usar useRuntimeConfig, creamos una función que acepta la baseURL como parámetro
export const createRaffleService = (baseURL) => ({
  async getAllRaffles() {
    try {
      const response = await axios.get(`${baseURL}/api/raffles`);
      return response.data;
    } catch (error) {
      console.error('Error fetching raffles:', error);
      throw error;
    }
  },

  async getRaffleById(id) {
    try {
      const response = await axios.get(`${baseURL}/api/raffles/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching raffle:', error);
      throw error;
    }
  },

  calculateProgress(ticketsSold, totalTickets) {
    return ((ticketsSold / totalTickets) * 100).toFixed(1);
  }
});
