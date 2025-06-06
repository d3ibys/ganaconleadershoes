<template>
  <header>
    <div class="menu-icon" @click="$emit('open-menu')">
      <i class="fas fa-bars"></i>
    </div>
    <div class="brand-logo">
      <img src="/logo.png" alt="Logo" />
    </div>
    <div class="help-icon" @click="$emit('open-help')">
      <i class="fas fa-question-circle"></i>
    </div>
  </header>
</template>

<script setup>
// No props, solo emite eventos
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: relative;
  background: #000;
}

.brand-logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.brand-logo img {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  object-fit: cover;
  background: #fff;
}

.menu-icon, .help-icon {
  font-size: 1.5rem;
  color: #d3c423;
  cursor: pointer;
  z-index: 2;
}
</style>
