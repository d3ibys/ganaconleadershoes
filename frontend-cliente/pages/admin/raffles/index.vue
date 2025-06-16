<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2>Lista de Rifas</h2>
      <NuxtLink to="/admin/raffles/create" class="btn">+ Nueva Rifa</NuxtLink>
    </div>
    <div v-if="raffles.length === 0">No hay rifas aún.</div>
    <ul v-else class="raffle-list">
      <li v-for="raffle in raffles" :key="raffle._id">
        <strong>{{ raffle.title }}</strong> - {{ raffle.status }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const raffles = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://191.101.80.132:4000/api/raffles')
    raffles.value = res.data
  } catch (err) {
    console.error('Error al obtener rifas', err)
  }
})
</script>

<style scoped>
.btn {
  background: #d3c423;
  color: black;
  padding: 10px 15px;
  border-radius: 8px;
  text-decoration: none;
}
.raffle-list {
  list-style: none;
  padding: 0;
}
.raffle-list li {
  padding: 10px;
  border-bottom: 1px solid #333;
}
</style>

