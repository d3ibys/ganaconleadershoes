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
<!-- Método de pago -->
<div class="section">
  <h2 class="section-title">Método de pago</h2>
  <div class="payment-methods">
    <label
      v-for="method in paymentMethods"
      :key="method.value"
      class="payment-option"
      :class="{ selected: form.paymentMethod === method.value }"
    >
      <input
        type="radio"
        name="paymentMethod"
        :value="method.value"
        v-model="form.paymentMethod"
        hidden
      />
      <img :src="method.image" :alt="method.label" />
      <div v-if="form.paymentMethod === method.value" class="check-icon">✔</div>
    </label>
  </div>

  <div v-if="form.paymentMethod" class="payment-info-card">
    <div v-if="form.paymentMethod === 'pagoMovil'">
      <h3>📲 Pago Móvil</h3>
      <p><b>Banco:</b> Banesco - 0134</p>
      <p><b>Teléfono:</b> 0424-8362674</p>
      <p><b>C.I:</b> 19.939.353</p>
      <button @click="copyPaymentInfo">📋 Copiar datos</button>
    </div>

    <div v-else-if="form.paymentMethod === 'zelle'">
      <h3>🏦 Zelle</h3>
      <p><b>Correo:</b> topCapsphoenix@gmail.com</p>
      <p><b>Titular:</b> Topcapsphoenix LLC</p>
    </div>

    <div v-else-if="form.paymentMethod === 'binance'">
      <h3>🪙 Binance</h3>
      <p><b>Correo:</b> aquilitoo12@gmail.com</p>
    </div>

    <input
      v-if="form.paymentMethod === 'pagoMovil'"
      v-model="form.extraInfo"
      @input="handleInput"
      @keypress="handleKeypress"
      @focus="$event.target.select()"
      type="number"
      min="0"
      max="9999"
      step="1"
      placeholder="- - - -"
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

      <!-- Fin Método de pago -->
      
      <!-- Resumen -->
      <div class="summary">
        <h2 class="section-title">Resumen</h2>
        <p>Rifa: {{ raffle?.title }}</p>
        <p>Boletos: {{ quantity }}</p>
        <p>Precio por boleto: Bs. {{ raffle?.price }}</p>
        <p>Total: Bs. {{ total }}</p>
      </div>

      <button class="submit-btn" type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Enviando...' : 'Verificar Pago' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRaffles } from '@/composables/useRaffles'
import { useRaffleTickets } from '@/composables/useRaffleTickets'

const paymentMethods = [
  {
    value: 'pagoMovil',
    label: 'Pago Móvil',
    image: '/images/pago-movil.png'
  },
  {
    value: 'zelle',
    label: 'Zelle',
    image: '/images/zelle.png'
  },
  {
    value: 'binance',
    label: 'Binance',
    image: '/images/binance.png'
  }
]

const router = useRouter()
const route = useRoute()
const { raffles, fetchRaffles } = useRaffles()
const { submitTicket } = useRaffleTickets()

const slug = route.params.slug
const quantity = Number(route.query.quantity || 0)
const total = Number(route.query.total || 0)
const orderId = route.query.orderId

const raffle = computed(() => raffles.value.find(r => r.slug === slug))

const mobilePaymentDetails = `
04141234567
J12345678
0134
${total}
`

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


// Inicio funciones codigo pin
// Reactive data
const pinValue = ref('')

// Computed
const isValid = computed(() => {
  return pinValue.value && 
         pinValue.value.toString().length === 4 && 
         parseInt(pinValue.value) >= 0 && 
         parseInt(pinValue.value) <= 9999
})

const hasError = computed(() => {
  return pinValue.value && 
         pinValue.value.toString().length === 4 && 
         !isValid.value
})

// Methods
const handleInput = (event) => {
  let value = event.target.value
  
  // Remover caracteres no numéricos
  value = value.replace(/[^0-9]/g, '')
  
  // Limitar a 4 dígitos máximo
  if (value.length > 4) {
    value = value.slice(0, 4)
  }
  
  // Actualizar el valor
  pinValue.value = value
  event.target.value = value
  
  // Lógica adicional cuando el PIN es válido
  if (isValid.value) {
    console.log('PIN válido:', value)
    // Aquí puedes agregar tu lógica cuando el PIN sea válido
  }
}

const handleKeypress = (event) => {
  // Permitir solo números y teclas de control
  if (!/[0-9]/.test(event.key) && 
      !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault()
  }
}

// Método para obtener el valor del PIN
const getPinValue = () => {
  return pinValue.value
}

// Método para limpiar el PIN
const clearPin = () => {
  pinValue.value = ''
}
// Fin codigo pin

const form = ref({
  paymentMethod: '',
  extraInfo: ''
})

const isSubmitting = ref(false)

onMounted(() => {
  if (!raffles.value.length) fetchRaffles()
})

/*function handleSubmit() {
  isSubmitting.value = true
  const payload = {
    user: userData,
    raffleSlug: slug,
    quantity,
    total,
    paymentMethod: form.value.paymentMethod,
    extraInfo: form.value.extraInfo,
    orderId: orderId
  }
*/
  // Aquí se enviaría al backend
//  setTimeout(() => {
//    console.log('Enviado al backend:', payload)
//    isSubmitting.value = false
//    alert('Compra registrada exitosamente')
//    router.push('/')
//  }, 1500)
//}


//const result = await submitTicket(form.value, slug, quantity, total)

async function handleSubmit() {
  isSubmitting.value = true

  const result = await submitTicket(form.value, slug, quantity, total, orderId)

  isSubmitting.value = false
  console.log('Result: ', result)
/*
  if (result.success) {
    alert('✅ Compra registrada exitosamente')
    router.push('/')
  } else {
    alert('❌ Ocurrió un error al registrar la compra')
  }
*/
}


const copyPaymentInfo = async (e) => {
  e.preventDefault()
  if (process.client && navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(paymentDetails)
      alert('✅ Datos copiados al portapapeles')
    } catch (err) {
      alert('❌ No se pudieron copiar los datos')
      console.error(err)
    }
  } else {
    alert('❌ Esta función no es compatible con tu navegador o estás en HTTP')
  }
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
input { 
    text-align:center;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
    border: none; /* Mantener sin borde si lo prefieres */
    background: #333; /* Un gris un poco más claro que el #222 actual */
    color: #AAA;     /* Un color de texto gris claro para indicar inactividad */
    cursor: not-allowed; /* Cambia el cursor para indicar que no es editable */
    opacity: 0.8;      /* Opcional: reducir ligeramente la opacidad */
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.4); /* Opcional: para un efecto "hundido" */
    -webkit-appearance: none; /* Para resetear estilos por defecto de algunos navegadores */
    -moz-appearance: none;
    appearance: none;
}

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

.payment-methods {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.payment-option {
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  transition: opacity 0.3s ease;
  border: 2px solid transparent;
}

.payment-option img {
  width: 100px;
  height: auto;
  opacity: 0.4;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: block;
}

.payment-option.selected img {
  opacity: 1;
  border: 2px solid #d3c423;
  box-shadow: 0 0 10px #d3c423aa;
}

.check-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #d3c423;
  color: black;
  font-weight: bold;
  border-radius: 50%;
  padding: 4px 6px;
  font-size: 14px;
}

.payment-info-card {
  background: #111;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
}

.payment-info-card h3 {
  margin-bottom: 10px;
  color: #f0c000;
}

.payment-info-card p {
  margin: 4px 0;
}

.payment-info-card input {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  background: #222;
  border: none;
  border-radius: 8px;
  color: white;
}

.payment-info-card button {
  margin-top: 10px;
  background: #d3c423;
  color: black;
  font-weight: bold;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

</style>

