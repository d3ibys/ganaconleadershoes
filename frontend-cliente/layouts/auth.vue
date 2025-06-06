<template>
  <div>
    <HeaderTop />
    <UserGreeting />
    <slot />
    <NavbarBottom />
    <MenuDrawer />
  </div>
</template>

<script setup>
import HeaderTop from '@/components/HeaderTop.vue'
import UserGreeting from '@/components/UserGreeting.vue'
import NavbarBottom from '@/components/NavbarBottom.vue'
import MenuDrawer from '@/components/MenuDrawer.vue'
</script>

