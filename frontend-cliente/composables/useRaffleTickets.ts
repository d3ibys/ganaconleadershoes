// ~/composables/useRaffleTickets.ts
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export function useRaffleTickets(basePrice: number, minQty = 2, available = 1000) {
  const quantity = ref(minQty)
  const selectedOption = ref(minQty)
  const isProcessing = ref(false)
  const remaining = ref(available)
  const tooltip = ref('')
  const baseURL = 'https://api.ganaconleadershoes.com/api'

  const total = computed(() => quantity.value * basePrice)

  const router = useRouter()

  const increment = () => {
console.log('Remain: '+remaining.value)
    if (quantity.value < remaining.value) {
      quantity.value++
      console.log('Botón presionado,valor: '+quantity.value)
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

const submitTicket = async (form, slug, quantityValue, totalValue, orderId) => {
    isProcessing.value = true
    try {
      const res = await fetch(`${baseURL}/order/validate/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          raffleSlug: slug,
          quantity: quantityValue,
          total: totalValue,
          orderId: orderId
        })
      })

      //if (!res.ok) throw new Error('Error al enviar los datos')


      const data = await res.json()
      localStorage.setItem('paidOrdenApprove', JSON.stringify(data))
      return { success: true, data }
    } catch (error) {
      console.error('❌ Error en submitTicket:', error)
      return { success: false, error }
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
    checkout,
    submitTicket
  }
}

