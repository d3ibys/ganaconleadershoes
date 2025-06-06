<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4 text-center text-yellow-400">Registro</h2>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <input v-model="form.fullName" type="text" placeholder="Nombre completo" class="w-full p-2 rounded bg-gray-800 text-white" />
      <input v-model="form.email" type="email" placeholder="Correo" class="w-full p-2 rounded bg-gray-800 text-white" />
      <input v-model="form.password" type="password" placeholder="Contraseña" class="w-full p-2 rounded bg-gray-800 text-white" />
      <button type="submit" class="bg-yellow-400 text-black px-4 py-2 rounded w-full" :disabled="loading">
        {{ loading ? 'Registrando...' : 'Registrarse' }}
      </button>
    </form>

    <p class="text-sm text-gray-400 mt-4 text-center">
      ¿Ya tienes cuenta? <NuxtLink to="/login" class="text-yellow-400 underline">Inicia sesión</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  fullName: '',
  email: '',
  password: '',
})

const { register, loading } = useAuth()
const router = useRouter()

const handleRegister = async () => {
  try {
    await register(form)
    router.push('/dashboard')
  } catch (err) {
    alert('Error al registrarse.')
  }
}
</script>

