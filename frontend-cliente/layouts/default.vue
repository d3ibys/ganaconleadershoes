<template>
  <div>
    <GlobalLoader />
    <slot />
    <NavbarBottom />
  </div>
</template>

<script setup>
import NavbarBottom from '@/components/NavbarBottom.vue'
import GlobalLoader from '@/components/GlobalLoader.vue'
</script>

