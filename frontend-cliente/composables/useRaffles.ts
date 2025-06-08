import { useState, useRuntimeConfig } from '#app' // Nuxt 3 composables
import { computed } from 'vue'

export const useRaffles = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.NUXT_PUBLIC_BASE_API || 'http://191.101.80.132:4000/api'

  const raffles = useState('raffles_list', () => [])
  const loading = useState('raffles_loading', () => false)
  const error = useState('raffles_error', () => null)

  const fetchRaffles = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch(`${baseURL}/raffles`)
      raffles.value = data || []
    } catch (err) {
      //error.value = err
      error.value = err?.message || 'Error desconocido'
      raffles.value = []
    } finally {
      loading.value = false
    }
  }

  const clear = () => {
    raffles.value = []
    error.value = null
  }

  const hasRaffles = computed(() => !!raffles.value && raffles.value.length > 0)

  return {
    raffles,
    loading,
    error,
    fetchRaffles,
    clear,
    hasRaffles,
  }
}

