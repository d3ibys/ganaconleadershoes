<template>
  <div class="featured-card">
    <div class="icon" align="center">
      <img v-if="image" :src="image" alt="" style="width:70%" />
      <i v-else :class="icon"></i>
    </div>
    <div class="text">{{ text }}</div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="progress-label">{{ progress }}% vendido</div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: String,
  image: String,
  text: String,
  progress: Number,
})
</script>

<style scoped>
.featured-card {
  background: #111;
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem;
  color: #fff;
  box-shadow: 0 0 10px #cddc39;
  position: relative;
}
.featured-card .progress-bar {
  background-color: #333;
  height: 8px;
  border-radius: 4px;
  margin-top: 1rem;
  overflow: hidden;
}
.featured-card .progress {
  height: 100%;
  background-color: #cddc39;
  border-radius: 4px;
  transition: width 0.5s ease;
}
.featured-card .progress-label {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #ccc;
  text-align: right;
}
.icon i {
  font-size: 2.2rem;
  color: #d3c423;
}
</style>
