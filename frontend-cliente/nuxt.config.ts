export default defineNuxtConfig({
  css: ['@/assets/styles.css'],
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_BASE_API || 'http://localhost:3000/api',
      NUXT_PUBLIC_BASE_API: 'http://191.101.80.132:4000/api'
    }
  }
})

