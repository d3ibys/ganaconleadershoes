// ~/composables/useRaffleTickets.ts
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export function useRaffleTickets(basePrice: number, minQty = 2, available = 1000) {
  const quantity = ref(minQty)
  const selectedOption = ref(minQty)
  const isProcessing = ref(false)
  const remaining = ref(available)
  const tooltip = ref('')
  const baseURL = 'http://191.101.80.132:4000/api'

  const total = computed(() => quantity.value * basePrice)

  const router = useRouter()

  const increment = () => {
    if (quantity.value < remaining.value) {
      quantity.value++
    }
    selectedOption.value = null
  }

  const decrement = () => {
    if (quantity.value > minQty) {
      quantity.value--
    }
    selectedOption.value = null
  }

  const selectOption = (value: number) => {
    selectedOption.value = value
    quantity.value = value
    localStorage.setItem('selectedQuantity', value.toString())
  }

  const reset = () => {
    quantity.value = minQty
    selectedOption.value = minQty
  }

  const checkout = async (raffle: any, userData: any) => {
    isProcessing.value = true
    try {
      const res = await $fetch(`${baseURL}/raffle/preorders`, {
        method: 'POST',
        body: {
          slug: raffle.slug,
          quantity: quantity.value,
          user: userData
        }
      })

      if (res.token) {
        localStorage.setItem('token', res.token)
      }
    
      localStorage.setItem('checkoutUser', JSON.stringify(userData))

      router.push({
        path: `/checkout/${raffle.slug}`,
        query: {
          orderId: res.orderId,
          quantity: quantity.value.toString(),
          total: res.total.toString(),
          slug: raffle.slug
        }
      })
    } catch (error: any) {
      console.error('❌ Error al crear la preorden:', error)
      tooltip.value = 'No se pudo crear la orden. Intente nuevamente.'
    } finally {
      isProcessing.value = false
    }
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
    checkout
  }
}

