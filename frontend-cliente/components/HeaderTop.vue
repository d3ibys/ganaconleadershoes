<template>
  <header class="header-top">
    <!-- Botón hamburguesa/X a la izquierda como toggle -->
    <button
      class="hamburger-btn"
      @click="$emit('toggle-drawer')"
      aria-label="Menú"
      :aria-expanded="open"
    >
      <span class="hamburger-icon" :class="{ open: open }">
        <span></span><span></span><span></span>
      </span>
    </button>
    <!-- Logo centrado -->
    <div class="header-logo">
      <NuxtLink to="/">
        <img src="/images/logo.png" alt="Logo" height="34" />
      </NuxtLink>
    </div>
    <!-- Ayuda a la derecha -->
    <button
      class="help-btn"
      @click="$emit('help')"
      aria-label="Ayuda"
    >
      <svg width="28" height="28" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#f3cc23"/>
        <text x="12" y="17" text-anchor="middle" font-size="16" fill="#181818" font-family="Arial" font-weight="bold">?</text>
      </svg>
    </button>
  </header>
</template>

<script setup>
const props = defineProps({
  open: Boolean
})
</script>

<style scoped>
.header-top {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.1em 0.7em 0.1em 0.4em;
  background: #1d1f20;
  min-height: 56px;
  box-shadow: 0 1.5px 8px #0001;
  position: relative;
  z-index: 120;
}
/* Botón hamburguesa/X */
.hamburger-btn {
  background: none;
  border: none;
  padding: 0.2em;
  margin-right: 0.3em;
  border-radius: 50%;
  cursor: pointer;
  transition: none;
  outline: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hamburger-icon {
  display: inline-block;
  width: 28px;
  height: 28px;
  position: relative;
  transition: 0.3s;
}
.hamburger-icon span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: #f3cc23;
  border-radius: 2px;
  opacity: 1;
  left: 0;
  transition: all 0.28s cubic-bezier(.65,.05,.36,1.03);
}
.hamburger-icon span:nth-child(1) {
  top: 7px;
}
.hamburger-icon span:nth-child(2) {
  top: 13px;
}
.hamburger-icon span:nth-child(3) {
  top: 19px;
}
.hamburger-icon.open span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}
.hamburger-icon.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger-icon.open span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}
.hamburger-btn:active {
  transform: scale(0.93);
}
.header-logo {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
}
.header-logo img {
  max-height: 34px;
  width: auto;
  object-fit: contain;
  display: block;
  border-radius: 5px;
}
.help-btn {
  background: none;
  border: none;
  padding: 0.2em;
  margin-left: 0.3em;
  border-radius: 50%;
  cursor: pointer;
  transition: none;
  outline: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.help-btn:active {
  transform: scale(0.93);
}
</style>
