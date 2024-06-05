import { ref } from 'vue';
import { defineStore } from 'pinia';
import { API } from '../api/api';
import { AxiosError } from 'axios';
import { errorToast, successToast } from '@/composables/toast';
import type { Courier } from '../types/couriers';

export const useCouriersStore = defineStore('couriers', () => {
  const courier = ref<number>(0);
  const courierOptions = ref<Courier[]>([]);
  const isLoading = ref<boolean>(false);

  const initCouriers = (data: Courier[]) => {
    courierOptions.value = data;
  };

  const resetData = () => {
    courier.value = 0;
  };

  async function getCouriers(): Promise<void> {
    try {
      const { data } = await API.couriers.getCouriers();
      initCouriers(data);
    } catch (error) {
      const _error = error as AxiosError<string>;
      errorToast('Произошла ошибка', _error.message);
    }
  }

  async function сreateCourier(courier: string): Promise<void> {
    isLoading.value = true;
    try {
      await API.couriers.createCourier(courier);
      successToast('Успех', 'Курьер добавлен');
      getCouriers();
    } catch (error) {
      const _error = error as AxiosError<string>;
      errorToast('Произошла ошибка', _error.message);
    } finally {
      isLoading.value = false;
    }
  }

  async function editCourier(courier: Courier): Promise<void> {
    isLoading.value = true;
    try {
      await API.couriers.editCourier(courier);
      successToast('Успех', 'Курьер изменён');
      getCouriers();
    } catch (error) {
      const _error = error as AxiosError<string>;
      errorToast('Произошла ошибка', _error.message);
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteCourier(id: number): Promise<void> {
    isLoading.value = true;
    try {
      await API.couriers.deleteCourier(id);
      successToast('Успех', 'Курьер удалён');
      getCouriers();
    } catch (error) {
      const _error = error as AxiosError<string>;
      errorToast('Произошла ошибка', _error.message);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    courier,
    courierOptions,
    isLoading,
    resetData,
    getCouriers,
    сreateCourier,
    editCourier,
    deleteCourier
  };
});
