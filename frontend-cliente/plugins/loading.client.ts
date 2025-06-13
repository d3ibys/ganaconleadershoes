// plugins/loading.client.ts
import { useLoadingStore } from '@/composables/useLoadingStore'

export default defineNuxtPlugin((nuxtApp) => {
  const loading = useLoadingStore()

  nuxtApp.hook('page:start', () => {
    loading.startLoading()
  })

  nuxtApp.hook('page:finish', () => {
    loading.stopLoading()
  })
})

