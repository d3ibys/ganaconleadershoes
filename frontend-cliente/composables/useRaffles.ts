// ~/composables/useRaffles.js
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'

const STORAGE_KEY = 'raffles_cache'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos en ms

export function useRaffles() {
  const raffles = ref([])
  const loading = ref(false)
  const error = ref(null)
  const config = useRuntimeConfig()
  const baseURL = config.public.NUXT_PUBLIC_BASE_API || 'http://191.101.80.132:4000/api'

  function isCacheValid(cached) {
    if (!cached || !cached.timestamp || !cached.data) return false
    const now = new Date().getTime()
    return now - cached.timestamp < CACHE_DURATION
  }

  async function fetchRaffles(force = false) {
    try {
      loading.value = true
      error.value = null

      if (process.client) {
        const cached = JSON.parse(localStorage.getItem(STORAGE_KEY))
        if (!force && isCacheValid(cached)) {
          raffles.value = cached.data
          return
        }
      }

      const res = await $fetch(`${baseURL}/raffles`)
      raffles.value = res || []

      if (process.client) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            data: raffles.value,
            timestamp: new Date().getTime(),
          })
        )
      }
    } catch (err) {
      error.value = 'No se pudieron cargar las rifas'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  if (process.client) {
    onMounted(() => {
      fetchRaffles()
      setInterval(() => fetchRaffles(true), CACHE_DURATION)
	console.log('Pagina actualizada cada 5 min...')
    })
  }

  return {
    raffles,
    loading,
    error,
    fetchRaffles,
  }
}

