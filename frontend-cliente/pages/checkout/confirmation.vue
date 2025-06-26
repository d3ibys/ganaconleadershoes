<template>
  <div class="confirmation-container">
    <h1 class="title">✅ ¡Compra completada!</h1>

    <div class="card">
      <h2>¡Gracias por tu compra, {{ user.fullName }}!</h2>
	<br />
      <p><strong>Cantidad de boletos:</strong> {{ quantity }}</p>
      <p><strong>Total pagado:</strong> Bs. {{ total }}</p>
      <p><strong>Método de pago:</strong> {{ paymentMethodLabel }}</p>
      <p><strong>Orden: #</strong>68587e97a93a6e95726218c2</p>
      <div class="notice">
        <p>
          Tu pago está siendo verificado. <br />
          Recibirás tus números en un lapso de <strong>12 a 24 horas</strong> por
          <strong>correo electrónico</strong> y <strong>WhatsApp</strong>.
        </p>
      </div>

      <button @click="goHome">Volver al inicio</button>
    </div>
  </div>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import confetti from 'canvas-confetti' // <--- Aquí lo importamos

const route = useRoute()
const router = useRouter()

const user = ref({ fullName: '', email: '', phone: '' })
const quantity = ref(0)
const total = ref(0)
const paymentMethod = ref('')

onMounted(() => {
  if (process.client) {
    const userData = JSON.parse(localStorage.getItem('checkoutUser') || '{}')
    const orderData = JSON.parse(localStorage.getItem('orderConfirmationData') || '{}')
    user.value = userData
    quantity.value = Number(orderData.quantity || 0)
    total.value = Number(orderData.total || 0)
    paymentMethod.value = orderData.paymentMethod || ''

    launchConfetti()
  }
})

const paymentMethodLabel = computed(() => {
  switch (paymentMethod.value) {
    case 'pagoMovil': return 'Pago Móvil'
    case 'zelle': return 'Zelle'
    case 'binance': return 'Binance'
    default: return 'No especificado'
  }
})

const goHome = () => router.push('/')

function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
    colors: ['#d3c423', '#ffffff', '#ffcc00']
  })

  // Repetimos una pequeña ráfaga para hacerlo más vistoso
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#d3c423', '#ffffff', '#ffcc00']
    })
  }, 800)
}
</script>



<style scoped>
.confirmation-container {
  max-width: 600px;
  margin: auto;
  padding: 30px;
  text-align: center;
  color: white;
}

.card {
  background: #1c1c1c;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 0 10px #cddc39;
}

.title {
  font-size: 26px;
  margin-bottom: 20px;
  color: #d3c423;
}

.notice {
  margin-top: 20px;
  padding: 15px;
  background: #222;
  border-radius: 8px;
  color: #ccc;
  font-size: 15px;
  border-left: 4px solid #d3c423;
}

button {
  margin-top: 25px;
  padding: 12px 20px;
  background: #d3c423;
  border: none;
  border-radius: 8px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
}
</style>

