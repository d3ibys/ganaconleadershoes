import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMedal, faCrown, faAward } from '@fortawesome/free-solid-svg-icons'

export default defineNuxtPlugin((nuxtApp) => {
  library.add(faMedal, faCrown, faAward)
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})

