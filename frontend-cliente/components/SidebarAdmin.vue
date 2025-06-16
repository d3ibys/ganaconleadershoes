<!-- File: components/SidebarAdmin.vue -->
<template>
  <aside class="sidebar">
    <h2 class="logo">Admin</h2>
    <nav>
      <NuxtLink to="/admin">Dashboard</NuxtLink>
      <NuxtLink to="/admin/raffles">Rifas</NuxtLink>
      <NuxtLink to="/">Volver al sitio</NuxtLink>
    </nav>
  </aside>
</template>

<script setup></script>

<style scoped>
.sidebar {
  width: 220px;
  background: #1e1e1e;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.logo {
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}
nav a {
  color: white;
  margin-bottom: 10px;
  text-decoration: none;
  display: block;
  padding: 8px;
  border-radius: 5px;
}
nav a:hover,
nav a.router-link-active {
  background: #333;
}
</style>
