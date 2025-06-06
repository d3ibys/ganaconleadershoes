<template>
  <div class="drawer-backdrop" @click.self="$emit('close')">
    <nav class="drawer">
      <div class="drawer-header">
        <span class="close-btn" @click="$emit('close')">&times;</span>
      </div>
      <ul>
        <li><i class="fas fa-home"></i> <router-link to="/" @click="$emit('close')">Inicio</router-link></li>
        <li><i class="fas fa-ticket-alt"></i> <router-link to="/rifas" @click="$emit('close')">Rifas</router-link></li>
        <li><i class="fas fa-file-alt"></i> <router-link to="/terminos" @click="$emit('close')">Términos y Condiciones</router-link></li>
        <li><i class="fas fa-headset"></i> <router-link to="/soporte" @click="$emit('close')">Soporte</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
// No props, solo emite close
</script>

<style scoped>
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 200;
}

.drawer {
  background: #111;
  width: 270px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 2rem;
  box-shadow: 2px 0 15px rgba(0,0,0,0.4);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { transform: translateX(-100%);}
  to { transform: translateX(0);}
}

.drawer-header {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
}

.close-btn {
  font-size: 2rem;
  color: #d3c423;
  cursor: pointer;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 2rem 0 1rem 1.5rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
}

li i {
  margin-right: 1rem;
  color: #d3c423;
}
a {
  color: #fff;
  text-decoration: none;
}
a.router-link-active {
  color: #d3c423;
}
</style>
