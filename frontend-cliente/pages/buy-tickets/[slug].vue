<template>
  <div>
    <div v-if="!raffle && !loading && !error" class="not-found">Rifa no encontrada.</div>
    <div v-else-if="loading" class="loading">Cargando rifa...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <BuyCard :raffle="raffle" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRaffles } from '~/composables/useRaffles'
import BuyCard from '~/components/BuyCard.vue'

const route = useRoute()
const slug = route.params.slug

const { raffles, loading, error, fetchRaffles } = useRaffles()

await fetchRaffles()

const raffle = computed(() => raffles.value.find(r => r.slug === slug))
</script>

<style scoped>
.loading,
.error,
.not-found {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: var(--color-secondary);
}
</style>

