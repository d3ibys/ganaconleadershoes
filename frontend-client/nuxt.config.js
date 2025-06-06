// nuxt.config.js
export default defineNuxtConfig({
  ssr: true,
  
  // Metadatos globales
  app: {
    head: {
      title: 'Gana con Leader Shoes',
      htmlAttrs: {
        lang: 'es'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: 'Plataforma de rifas Leader Shoes' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { 
          rel: 'stylesheet', 
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
        }
      ]
    }
  },

  // Módulos
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  // CSS global
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '@/assets/styles/main.scss'
  ],

  // Build config
  build: {
    transpile: ['vuetify']
  },

  // Variables de entorno
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001'
    }
  },

  // Configuración de desarrollo
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  },

  // Auto importaciones
  imports: {
    dirs: [
      'stores',
      'composables',
      'utils'
    ]
  },

  // Plugins
  plugins: [
    '~/plugins/vuetify.js'
  ],

  // Componentes auto-importados
  components: {
    dirs: [
      '~/components',
      '~/components/ui',
      '~/components/layout',
      '~/components/raffle'
    ]
  },

  // Optimización
  nitro: {
    compressPublicAssets: true
  }
})
