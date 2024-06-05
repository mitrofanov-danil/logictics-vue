import { ref } from 'vue';
import { API } from '@/api/api';
import { defineStore } from 'pinia';
import type { Route, CreateRoute } from '@/types/routeList';
import { errorToast, successToast } from '@/composables/toast';
import { AxiosError } from 'axios';
import { convertStringToDate } from '@/utils/handlerDate';

export const useRouteListStore = defineStore('routeList', () => {
  const isLoading = ref<boolean>(false);
  const trips = ref<Route[]>([]);

  const initTrips = (data: Route[]) => {
    const result = data.map((el) => {
      el.back = convertStringToDate(el.back);
      return el;
    });
    trips.value = result;
  };

  async function getRouteList(): Promise<void> {
    try {
      const { data } = await API.routeList.getRouteList();
      initTrips(data);
    } catch (error) {
      const _error = error as AxiosError<string>;
      errorToast('Произошла ошибка', _error.message);
    }
  }

  async function сreateRoute(newRoute: CreateRoute): Promise<void> {
    isLoading.value = true;
    try {
      await API.routeList.createRoute(newRoute);
      successToast('Успех!', 'Маршрут создан');
      getRouteList();
    } catch (error) {
      const _error = error as AxiosError<string>;
      errorToast('Произошла ошибка', _error.message);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    trips,
    getRouteList,
    сreateRoute
  };
});
