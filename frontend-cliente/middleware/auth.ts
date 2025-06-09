import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { jwtDecode } from 'jwt-decode' // ✅ Importación correcta

// Rutas que requieren autenticación
const protectedRoutes = [
  '/my-tickets',
  '/dashboard',
]

// Verifica si la ruta está protegida
function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some(
    route => path === route || path.startsWith(route + '/')
  )
}

// Valida si el JWT es válido y no está expirado
function isValidJWT(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token) // ✅ Uso correcto
    if (!decoded || !decoded.exp) {
      if (process.dev) console.warn('JWT inválido o sin campo exp', decoded)
      return false
    }
    if (Date.now() >= decoded.exp * 1000) {
      if (process.dev) console.warn('JWT expirado', decoded)
      return false
    }
    return true
  } catch (error) {
    if (process.dev) console.warn('Error decodificando JWT', error)
    return false
  }
}

// Middleware principal
export default defineNuxtRouteMiddleware((to) => {
  // Asegúrate de que solo se ejecute en cliente
  if (!process.client) return

  if (!isProtectedRoute(to.path)) return

  const token = localStorage.getItem('auth_token')
  const user = localStorage.getItem('auth_user')

  if (process.dev) {
    console.log('Middleware Auth | token:', token)
    console.log('Middleware Auth | user:', user)
  }

  if (!token) {
    if (process.dev) console.warn('No hay token')
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }

  if (!isValidJWT(token)) {
    if (process.dev) console.warn('Token inválido o expirado')
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }

  if (!user) {
    if (process.dev) console.warn('No hay user')
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }

  try {
    JSON.parse(user)
  } catch {
    if (process.dev) console.warn('User malformado')
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})

