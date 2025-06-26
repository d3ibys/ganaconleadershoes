export default defineNuxtConfig({
  css: ['@/assets/styles.css'],

  modules: [
    '@pinia/nuxt',
  ],

  plugins: ['@/plugins/fontawesome'],

  ssr: true, // Server Side Rendering

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 'http-equiv': 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
        { 'http-equiv': 'Pragma', content: 'no-cache' },
        { 'http-equiv': 'Expires', content: '0' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_BASE_API || 'https://api.ganaconleadershoes.com/api'
    }
  }
})

