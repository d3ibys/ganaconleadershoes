<template>
  <div class="checkout-container">
    <h1 class="title">Finalizar Compra</h1>

    <form @submit.prevent="handleSubmit" class="form">
      <!-- Datos del comprador -->
      <div class="section">
        <h2 class="section-title">Datos del comprador</h2>
        <input :value="userData.fullName" type="text" disabled />
        <input :value="userData.cedula" type="text" disabled />
        <input :value="userData.phone" type="text" disabled />
        <input :value="userData.email" type="text" disabled />
      </div>

      <!-- Método de pago -->
      <div class="section">
        <h2 class="section-title">Método de pago</h2>
        <select v-model="form.paymentMethod" required>
          <option disabled value="">Selecciona un método</option>
          <option value="pagoMovil">Pago Móvil</option>
          <option value="zelle">Zelle</option>
          <option value="binance">Binance</option>
        </select>

        <div v-if="form.paymentMethod">
          <div class="payment-info">
            <p v-if="form.paymentMethod === 'pagoMovil'">
              Banco: BOD, Teléfono: 0414-1234567, CI: 12345678
            </p>
            <p v-else-if="form.paymentMethod === 'zelle'">
              Correo: zelle@empresa.com
            </p>
            <p v-else-if="form.paymentMethod === 'binance'">
              Correo: binance@empresa.com
            </p>
          </div>

          <input
            v-if="form.paymentMethod === 'pagoMovil'"
            v-model="form.extraInfo"
            type="text"
            maxlength="4"
            placeholder="Últimos 4 dígitos del número"
            required
          />
          <input
            v-else
            v-model="form.extraInfo"
            type="email"
            placeholder="Correo desde el que pagaste"
            required
          />
        </div>
      </div>

      <!-- Resumen -->
      <div class="summary">
        <h2 class="section-title">Resumen</h2>
        <p>Rifa: {{ raffle?.title }}</p>
        <p>Boletos: {{ quantity }}</p>
        <p>Precio por boleto: Bs. {{ raffle?.price }}</p>
        <p>Total: Bs. {{ total }}</p>
      </div>

      <button class="submit-btn" type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Enviando...' : 'Confirmar compra' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRaffles } from '@/composables/useRaffles'

const router = useRouter()
const route = useRoute()
const { raffles, fetchRaffles } = useRaffles()

const slug = route.params.slug
const quantity = Number(route.query.quantity || 0)
const total = Number(route.query.total || 0)

const raffle = computed(() => raffles.value.find(r => r.slug === slug))


const userData = ref({
  fullName: '', // Inicializa con un valor por defecto o nulo
  // otras propiedades que esperes en checkoutUser
});


onMounted(() => {
  // Este código solo se ejecuta en el cliente
  if (process.client) { // Aunque onMounted ya garantiza esto, es una buena práctica para mayor seguridad
    userData.value = JSON.parse(localStorage.getItem('checkoutUser') || '{}')
  }
});


const form = ref({
  paymentMethod: '',
  extraInfo: ''
})

const isSubmitting = ref(false)

onMounted(() => {
  if (!raffles.value.length) fetchRaffles()
})

function handleSubmit() {
  isSubmitting.value = true
  const payload = {
    user: userData,
    raffleSlug: slug,
    quantity,
    total,
    paymentMethod: form.value.paymentMethod,
    extraInfo: form.value.extraInfo
  }

  // Aquí se enviaría al backend
  setTimeout(() => {
    console.log('Enviado al backend:', payload)
    isSubmitting.value = false
    alert('Compra registrada exitosamente')
    router.push('/')
  }, 1500)
}
</script>

<style scoped>
.checkout-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  color: white;
  box-shadow: 0 0 10px #cddc39;
}
.title {
  font-size: 24px;
  margin-bottom: 20px;
}
.section {
  margin-bottom: 20px;
}
.section-title {
  font-size: 18px;
  margin-bottom: 10px;
}
input,
select {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #222;
  color: white;
}
.payment-info {
  background: #111;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 14px;
}
.summary {
  background: #1a1a1a;
  padding: 15px;
  border-radius: 8px;
}
.submit-btn {
  width: 100%;
  padding: 12px;
  background: #d3c423;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

