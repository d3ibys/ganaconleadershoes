<!-- File: pages/admin/raffles/create.vue -->
<template>
  <div class="p-6 bg-gray-900 text-white rounded-lg shadow-md max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Crear Nueva Rifa</h1>

    <form @submit.prevent="createRaffle" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input v-model="raffle.title" type="text" placeholder="Título de la rifa" required class="input" />
      <input v-model="raffle.slug" type="text" placeholder="Slug (único)" required class="input" />
      <input v-model="raffle.totalNumbers" type="number" placeholder="Cantidad total de números" required class="input" />
      <input v-model="raffle.price" type="number" placeholder="Precio por número" required class="input" />

      <textarea v-model="raffle.description" placeholder="Descripción" required class="textarea col-span-1 md:col-span-2" />
      <textarea v-model="raffle.details" placeholder="Detalles adicionales" class="textarea col-span-1 md:col-span-2" />

      <input v-model="raffle.firstPrize" type="text" placeholder="Primer premio" class="input" />
      <input v-model="raffle.secondPrize" type="text" placeholder="Segundo premio" class="input" />
      <input v-model="raffle.thirdPrize" type="text" placeholder="Tercer premio" class="input" />

      <input v-model="raffle.imageMain" type="text" placeholder="URL de imagen principal" class="input col-span-1 md:col-span-2" />
      <input v-model="raffle.imageFirstPrize" type="text" placeholder="Imagen del primer premio" class="input" />
      <input v-model="raffle.imageSecondPrize" type="text" placeholder="Imagen del segundo premio" class="input" />
      <input v-model="raffle.imageThirdPrize" type="text" placeholder="Imagen del tercer premio" class="input" />

      <button type="submit" class="col-span-1 md:col-span-2 bg-yellow-400 text-black py-2 rounded font-bold hover:bg-yellow-300 transition">
        Crear Rifa
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const raffle = ref({
  title: '',
  slug: '',
  description: '',
  details: '',
  totalNumbers: 0,
  price: 0,
  firstPrize: '',
  secondPrize: '',
  thirdPrize: '',
  imageMain: '',
  imageFirstPrize: '',
  imageSecondPrize: '',
  imageThirdPrize: ''
})

async function createRaffle() {
  try {
    const res = await axios.post('http://localhost:4000/api/admin/raffles', raffle.value)
    alert('✅ Rifa creada exitosamente')
    router.push('/admin/raffles')
  } catch (err) {
    console.error(err)
    alert('❌ Ocurrió un error al crear la rifa')
  }
}
</script>

<style scoped>
.input {
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #1f2937;
  color: white;
  width: 100%;
}
.textarea {
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #1f2937;
  color: white;
  width: 100%;
  min-height: 80px;
}
</style>

