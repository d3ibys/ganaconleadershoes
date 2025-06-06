<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4 text-center text-yellow-400">Iniciar Sesión</h2>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <input v-model="form.email" type="email" placeholder="Correo" class="w-full p-2 rounded bg-gray-800 text-white" />
      <input v-model="form.password" type="password" placeholder="Contraseña" class="w-full p-2 rounded bg-gray-800 text-white" />
      <button type="submit" class="bg-yellow-400 text-black px-4 py-2 rounded w-full" :disabled="loading">
        {{ loading ? 'Ingresando...' : 'Ingresar' }}
      </button>
    </form>

    <p class="text-sm text-gray-400 mt-4 text-center">
      ¿No tienes cuenta? <NuxtLink to="/register" class="text-yellow-400 underline">Regístrate</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  email: '',
  password: '',
})

const { login, loading } = useAuth()
const router = useRouter()

const handleLogin = async () => {
  try {
    await login(form)
    router.push('/dashboard')
  } catch (err) {
    alert('Credenciales incorrectas.')
  }
}
</script>

