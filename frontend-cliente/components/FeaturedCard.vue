<template>
  <div class="featured-card">
    <div class="icon" align="center" v-if="img">
      <img :src="img" alt="Rifa" style="width:70%" />
    </div>
    <div class="icon" v-else-if="icon">
      <i :class="icon"></i>
    </div>
    <div class="text">{{ text }}</div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="progress-label">{{ progressLabel }}</div>
  </div>
</template>

<script setup>
defineProps({
  img: String,
  icon: String,
  text: String,
  progress: Number,
  progressLabel: String
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
.icon i {
  font-size: 2.5rem;
  color: var(--color-primary);
}
.progress-bar {
  background-color: #333;
  height: 8px;
  border-radius: 4px;
  margin-top: 1rem;
  overflow: hidden;
}
.progress {
  height: 100%;
  background-color: #cddc39;
  border-radius: 4px;
  transition: width 0.5s ease;
}
.progress-label {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #ccc;
  text-align: right;
}
.text {
  font-size: 0.95rem;
  line-height: 1.4;
  margin-top: 0.5rem;
}
</style>
