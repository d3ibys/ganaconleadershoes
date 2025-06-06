// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          dark: true,
          colors: {
            background: '#000000',
            surface: '#111111',
            primary: '#d3c423',
            secondary: '#999999',
            text: '#ffffff'
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
