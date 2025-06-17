import { ref } from 'vue';
import { b as useRuntimeConfig } from './server.mjs';

function useRaffles() {
  const raffles = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const config = useRuntimeConfig();
  const baseURL = config.public.NUXT_PUBLIC_BASE_API || "https://api.ganaconleadershoes.com/api";
  async function fetchRaffles(force = false) {
    try {
      loading.value = true;
      error.value = null;
      if (false) ;
      const res = await $fetch(`${baseURL}/raffles`);
      raffles.value = res || [];
      if (false) ;
    } catch (err) {
      error.value = "No se pudieron cargar las rifas";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }
  return {
    raffles,
    loading,
    error,
    fetchRaffles
  };
}

export { useRaffles as u };
//# sourceMappingURL=useRaffles-BeUz1zg4.mjs.map
