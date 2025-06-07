<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="logo-wrap">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <h2 class="auth-title">Crear cuenta</h2>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <i class="fas fa-user"></i>
          <input
            v-model="form.fullName"
            type="text"
            placeholder="Nombre completo"
            required
            autocomplete="name"
          />
        </div>
        <div class="input-group">
          <i class="fas fa-address-card"></i>
          <input
            v-model="form.nationalId"
            type="text"
            placeholder="Cédula"
            required
            autocomplete="off"
          />
        </div>
        <div class="input-group">
          <i class="fas fa-phone"></i>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="Teléfono"
            required
            autocomplete="tel"
          />
        </div>
        <div class="input-group">
          <i class="fas fa-envelope"></i>
          <input
            v-model="form.email"
            type="email"
            placeholder="Correo electrónico"
            required
            autocomplete="email"
          />
        </div>
        <div class="input-group">
          <i class="fas fa-lock"></i>
          <input
            v-model="form.password"
            type="password"
            placeholder="Contraseña"
            required
            autocomplete="new-password"
          />
        </div>
        <button class="auth-btn" :disabled="loading">
          <span v-if="!loading">Registrarse</span>
          <span v-else><i class="fas fa-spinner fa-spin"></i> Registrando...</span>
        </button>
      </form>
      <div class="auth-links">
        <NuxtLink to="/login">¿Ya tienes cuenta? Inicia sesión</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  fullName: '',
  nationalId: '',
  phone: '',
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

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
}
.auth-card {
  background: #171717;
  padding: 2.2rem 1.5rem 1.5rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: 0 8px 32px #000a;
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo-wrap img {
  width: 65px;
  height: 65px;
  border-radius: 20px;
  background: #fff;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px #0004;
}
.auth-title {
  color: var(--color-primary);
  margin-bottom: 1.3rem;
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
}
.input-group {
  display: flex;
  align-items: center;
  background: #232323;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 0.7rem 1rem;
  color: var(--color-secondary);
}
.input-group i {
  margin-right: 0.7rem;
  font-size: 1.1rem;
}
.input-group input {
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-text);
  font-size: 1rem;
  width: 100%;
}
.auth-btn {
  width: 100%;
  background: linear-gradient(90deg, var(--color-primary), #fff700);
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 0;
  margin-top: 0.1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s, opacity 0.2s;
  box-shadow: 0 2px 8px #d3c42344;
}
.auth-btn:disabled {
  opacity: 0.7;
  cursor: default;
}
.auth-links {
  margin-top: 1.2rem;
  text-align: center;
}
.auth-links a {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.98rem;
  transition: text-decoration 0.15s;
}
.auth-links a:hover {
  text-decoration: underline;
}
</style>
