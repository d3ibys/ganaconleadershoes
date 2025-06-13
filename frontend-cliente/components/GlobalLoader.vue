<!-- components/GlobalLoader.vue -->
<template>
  <div v-if="loading.isLoading" class="loader-overlay">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { useLoadingStore } from '@/composables/useLoadingStore'
const loading = useLoadingStore()
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 15, 15, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.spinner {
  border: 6px solid #ddd;
  border-top: 6px solid #d3c423;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

