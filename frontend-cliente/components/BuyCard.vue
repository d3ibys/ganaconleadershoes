<template>
  <div class="container">
    <div class="card">
      <img :src="raffle.imageMain" :alt="raffle.title" />
      <div class="card-header">
        <span class="badge">03-07-2025</span>
        <span>Boleto {{ raffle.price ? `Bs. ${raffle.price}` : '-' }}</span>
      </div>
      <div class="title">{{ raffle.title }}</div>
      <div class="progress-bar" :title="tooltip">
        <div class="progress-bar-inner" :style="{ width: raffle.percentSold + '%' }">{{ raffle.percentSold }}</div>
      </div>
	<div class="progress-label">{{ raffle.percentSold }}% vendido</div>
    </div>

    <div class="ticket-section">
      <h3>Compra aquí tus boletos</h3>
      <div class="options">
        <div
          v-for="(amount, index) in ticketOptions"
          :key="index"
          class="option"
          :class="{ active: selectedOption === amount }"
          @click="selectOption(amount)"
        >
          +{{ amount }}<br v-if="amount === popularAmount" /><small v-if="amount === popularAmount">Más popular</small>
        </div>
      </div>

      <div class="counter">
        <button @click="decrement">-</button>
           <input type="number" class="count" style="width:250px !important;text-align:center;" :value="quantity"/>
        <button @click="increment">+</button>
      </div>

      <div class="total">💰 Total: Bs. {{ total }}</div>
        <p class="warning-text">
              Para los pagos con Binance o Zelle tiene que ser una compra mínima de diez (10) tickets.
        </p>
      <p v-if="quantity < 2" class="warning">⚠️ Mínimo 2 boletos requeridos</p>
      <p v-if="quantity > remaining" class="warning">⚠️ Solo quedan {{ remaining }} disponibles</p>

      <form @submit.prevent="handleCheckout">
        <input class="form_input" v-model="userData.fullName" placeholder="Nombre completo" required />
        <input class="form_input" v-model="userData.email" placeholder="Correo electrónico" type="email" required />
	<PhoneInput v-model="userData.phone" />
	    <select
      		id="estado"
      		v-model="userData.state"
      		class="custom-select"
      		required>
      			<option disabled selected value="">Seleccione un estado</option>
      			<option
        			v-for="estado in estadosVenezuela"
        			:key="estado.nombre"
        			:value="estado.nombre"
      			>
        			{{ estado.nombre }}
      			</option>
    	    </select>
        <input class="form_input" v-model="userData.cedula" placeholder="Cédula" type="number" required />
        <button class="btn" :disabled="quantity < 2 || quantity > remaining || isProcessing">
          {{ isProcessing ? 'Procesando...' : 'Comprar números' }}
        </button>
      </form>

      <button class="btn btn-outline" @click="reset" :disabled="isProcessing">Limpiar</button>
      <button class="btn btn-outline" @click="() => alert('Ver detalle')" :disabled="isProcessing">Ver detalle</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted} from 'vue'
import { useRaffleTickets } from '@/composables/useRaffleTickets'
import  PhoneInput from './PhoneInput'

const props = defineProps({
  raffle: {
    type: Object,
    required: true
  },
  ticketOptions: { type: Array, default: () => [2, 5, 10, 20, 30, 50] },
  popularAmount: { type: Number, default: 5 },
})

const userData = reactive({
  fullName: '',
  state: '',
  email: '',
  phone: '' || "",
  whatsapp: '',
  cedula: ''
})

const estadosVenezuela = [
  { nombre: "Amazonas", capital: "Puerto Ayacucho" },
  { nombre: "Anzoátegui", capital: "Barcelona" },
  { nombre: "Apure", capital: "San Fernando de Apure" },
  { nombre: "Aragua", capital: "Maracay" },
  { nombre: "Barinas", capital: "Barinas" },
  { nombre: "Bolívar", capital: "Ciudad Bolívar" },
  { nombre: "Carabobo", capital: "Valencia" },
  { nombre: "Cojedes", capital: "San Carlos" },
  { nombre: "Delta Amacuro", capital: "Tucupita" },
  { nombre: "Falcón", capital: "Coro" },
  { nombre: "Guárico", capital: "San Juan de los Morros" },
  { nombre: "Lara", capital: "Barquisimeto" },
  { nombre: "Mérida", capital: "Mérida" },
  { nombre: "Miranda", capital: "Los Teques" },
  { nombre: "Monagas", capital: "Maturín" },
  { nombre: "Nueva Esparta", capital: "La Asunción" },
  { nombre: "Portuguesa", capital: "Guanare" },
  { nombre: "Sucre", capital: "Cumaná" },
  { nombre: "Táchira", capital: "San Cristóbal" },
  { nombre: "Trujillo", capital: "Trujillo" },
  { nombre: "La Guaira", capital: "La Guaira" }, // Anteriormente Vargas
  { nombre: "Yaracuy", capital: "San Felipe" },
  { nombre: "Zulia", capital: "Maracaibo" },
  { nombre: "Distrito Capital", capital: "Caracas" }, // Aunque no es un estado, se incluye a menudo por su relevancia.
  { nombre: "Dependencias Federales", capital: "Sin capital específica" } // Islas y archipiélagos
];

const {
  quantity,
  selectedOption,
  isProcessing,
  total,
  tooltip,
  remaining,
  selectOption,
  increment,
  decrement,
  reset,
  checkout
} = useRaffleTickets(props.raffle.price, 2, props.raffle.totalNumbers - props.raffle.totalSoldNumbers)

const handleCheckout = () => {
  checkout(props.raffle, userData)
}

onMounted(() => {
  if (process.client && localStorage.getItem('checkoutUser')) {
    try {
      const savedData = JSON.parse(localStorage.getItem('checkoutUser'))
      Object.assign(userData, savedData)
    } catch (error) {
      console.error('Error al cargar datos del localStorage:', error)
    }
  }
})
</script>

<style scoped>
:root {
  --color-bg: #000;
  --color-primary: #d3c423;
  --color-text: #fff;
  --color-secondary: #999;
  --radius: 14px;
}
.progress-label {
  padding: 10px;
  font-size: 0.85rem;
  color: #ccc;
  text-align: right;
}

.warning-text {
  color: #ffcc00;
  background: #332f00;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  margin-bottom: 15px;
}

.form_input {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 8px;
    border: none;
    background: #222;
    color: white;
    box-shadow: 0px 0px 1px 1px #cddc39;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background-color: #111;
  border-radius: var(--radius);
  padding: 20px;
}

.card {
  background-color: #1a1a1a;
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 20px;
}

.card img {
  width: 100%;
  display: block;
}

.card-header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.badge {
  background-color: rgba(211, 196, 35, 0.1);
  color: var(--color-primary);
  padding: 4px 10px;
  border-radius: var(--radius);
  font-size: 12px;
}

.title {
  font-weight: bold;
  margin: 10px 0;
  font-size: 16px;
}

.progress-bar {
  background: #333;
  border-radius: var(--radius);
  height: 6px;
  overflow: hidden;
  margin-top: 5px;
}

.progress-bar-inner {
  height: 100%;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
}

.ticket-section {
  background-color: #1a1a1a;
  border-radius: var(--radius);
  padding: 20px;
  text-align: center;
}

.options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 15px;
}

.option {
  padding: 10px;
  border-radius: var(--radius);
  background-color: #222;
  border: 1px solid #333;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
  font-size: 16px;
}

.option.active {
  background-color: var(--color-primary);
  color: #000;
  transform: scale(1.03);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
}

.counter {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.counter button,
.counter .count {
  background-color: #222;
  padding: 10px 12px;
  border: 1px solid #333;
  color: var(--color-text);
  font-size: 20px;
  border-radius: var(--radius);
  cursor: pointer;
}

.total {
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--color-primary);
}

.btn {
  background-color: var(--color-primary);
  color: #000;
  border: none;
  padding: 12px;
  width: 100%;
  border-radius: var(--radius);
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.2s ease;
}

.btn:hover:not(:disabled) {
  filter: brightness(1.1);
  box-shadow: 0 0 0 2px var(--color-primary);
}

.btn:active:not(:disabled) {
  transform: scale(0.98);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.warning {
  color: var(--color-primary);
  margin-bottom: 10px;
  font-size: 14px;
}
.select-container {
  margin-bottom: 16px;
}

.select-label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #ccc;
}

.custom-select {
  width: 100%;
  padding: 12px;
  background-color: #222;
  color: #6a756a;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  appearance: none;
  cursor: pointer;
  box-shadow: 0px 0px 1px 1px #cddc39;
  margin-bottom: 10px
}

.custom-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px #d3c423;
}
</style>

