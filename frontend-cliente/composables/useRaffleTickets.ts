// File: composables/useRaffleTickets.ts
import { ref } from 'vue'

export function useRaffleTickets(basePrice = 5, minQty = 2, available = 1000) {
  const quantity = ref(minQty)
  const selectedOption = ref(5)
  const isProcessing = ref(false)
  const total = computed(() => quantity.value * basePrice)
  const remaining = ref(available)
  const tooltip = computed(() => `${available - remaining.value} vendidos / ${available}`)

  const selectOption = (amount) => {
    selectedOption.value = amount
    quantity.value = amount
    localStorage.setItem('selectedQuantity', amount)
  }

  const increment = () => {
    if (quantity.value < remaining.value) quantity.value++
    selectedOption.value = null
  }

  const decrement = () => {
    if (quantity.value > 1) quantity.value--
    selectedOption.value = null
  }

  const reset = () => {
    quantity.value = minQty
    selectedOption.value = minQty
  }

  const buyTickets = async () => {
    isProcessing.value = true
    await new Promise(resolve => setTimeout(resolve, 2000)) // simulate API call
    isProcessing.value = false
    alert(`✅ Compra realizada exitosamente. ${quantity.value} boletos comprados.`)
  }

  onMounted(() => {
    const savedQty = localStorage.getItem('selectedQuantity')
    if (savedQty) {
      quantity.value = parseInt(savedQty)
      selectedOption.value = parseInt(savedQty)
    }
  })

  return {
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
    buyTickets
  }
} 
