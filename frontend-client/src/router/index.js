import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/registro', component: Register },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  // Puedes agregar más rutas como /rifas, /tickets, /soporte, /terminos, etc.
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
