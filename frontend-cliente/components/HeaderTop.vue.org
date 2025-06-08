<template>
  <header class="header-top">
    <div class="menu-icon" @click="$emit('toggle-drawer')">
      <i class="fas fa-bars"></i>
    </div>
    <div class="brand-logo">
      <img src="/images/logo.png" alt="Logo" />
    </div>
    <div class="help-icon">
      <i class="fas fa-question-circle"></i>
    </div>
  </header>
</template>

<style scoped>
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: relative;
}
.brand-logo {
  position: absolute;
  padding-top: 25px;
  left: 50%;
  transform: translateX(-50%);
}
.brand-logo img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background: #fff;
}
.menu-icon,
.help-icon {
  font-size: 1.5rem;
  color: #d3c423;
  cursor: pointer;
}
</style>

