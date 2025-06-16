// File: layouts/admin.vue
<template>
  <div class="admin-layout">
    <SidebarAdmin />
    <main class="admin-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import SidebarAdmin from '@/components/SidebarAdmin.vue'
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #121212;
  color: white;
}
.admin-content {
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
}
</style>
