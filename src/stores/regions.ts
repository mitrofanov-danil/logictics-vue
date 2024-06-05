import { ref } from 'vue';
import { defineStore } from 'pinia';
import { API } from '../api/api';
import { AxiosError } from 'axios';
import type { Region } from '../types/regions';
import { errorToast, successToast } from '@/composables/toast';

export const useRegionsStore = defineStore('regions', () => {
  const isLoading = ref<boolean>(false);
  const region = ref<Region | null>(null);
  const regionOptions = ref<Region[]>([]);

  const initRegions = (data: Region[]) => {
    regionOptions.value = data;
  };

  const resetData = () => {
    region.value = null;
  };

  async function getRegions(): Promise<void> {
    try {
      const { data } = await API.regions.getRegions();
      initRegions(data);
    } catch (error) {
      const _error = error as AxiosError<string>;
      errorToast('Произошла ошибка', _error.message);
    }
  }

  async function сreateRegion(region: string): Promise<void> {
    isLoading.value = true;
    try {
      await API.regions.createRegion(region);
      successToast('Успех', 'Регион добавлен');
      getRegions();
    } catch (error) {
      const _error = error as AxiosError<string>;
      errorToast('Произошла ошибка', _error.message);
    } finally {
      isLoading.value = false;
    }
  }

  async function editRegion(region: Region): Promise<void> {
    isLoading.value = true;
    try {
      await API.regions.editRegion(region);
      successToast('Успех', 'Регион изменён');
      getRegions();
    } catch (error) {
      const _error = error as AxiosError<string>;
      errorToast('Произошла ошибка', _error.message);
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteRegion(id: number): Promise<void> {
    isLoading.value = true;
    try {
      await API.regions.deleteRegion(id);
      successToast('Успех', 'Регион удалён');
      getRegions();
    } catch (error) {
      const _error = error as AxiosError<string>;
      errorToast('Произошла ошибка', _error.message);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    region,
    regionOptions,
    isLoading,
    resetData,
    getRegions,
    сreateRegion,
    editRegion,
    deleteRegion
  };
});
