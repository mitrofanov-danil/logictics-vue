import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref<boolean>(false);

  const setLoading = (data: boolean) => {
    isLoading.value = data;
  };

  return {
    isLoading,
    setLoading
  };
});
