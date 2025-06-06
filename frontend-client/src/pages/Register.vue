<template>
  <div class="auth-container">
    <h2>Registrarse</h2>
    <form class="auth-form">
      <input type="text" placeholder="Nombre completo" required />
      <input type="email" placeholder="Correo electrónico" required />
      <input type="password" placeholder="Contraseña" required />
      <input type="password" placeholder="Repetir contraseña" required />
      <button type="submit">Crear cuenta</button>
      <div class="auth-link">
        ¿Ya tienes cuenta?
        <router-link to="/login">Iniciar sesión</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
</script>

<style scoped>
.auth-container {
  max-width: 370px;
  margin: 2rem auto;
  background: #111;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  color: #fff;
  box-shadow: 0 4px 20px rgba(212, 255, 0, 0.07);
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input {
  padding: 0.7rem 1rem;
  border-radius: 12px;
  border: 1px solid #d3c423;
  background: #222;
  color: #fff;
  font-size: 1rem;
}
button {
  padding: 0.7rem;
  border-radius: 12px;
  border: none;
  background: linear-gradient(45deg, #d3c423, #fff700);
  color: #000;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
}
.auth-link {
  margin-top: 1rem;
  font-size: 0.95rem;
  text-align: center;
}
.auth-link a {
  color: #d3c423;
  text-decoration: underline;
  margin-left: 0.3rem;
}
</style>
