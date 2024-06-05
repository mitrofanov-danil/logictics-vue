<template>
  <div>
    <div class="form">
      <div class="form__item">
        <label for="region">Регион</label>
        <Dropdown
          id="region"
          v-model="regionsStore.region"
          :options="regionsStore.regionOptions"
          optionLabel="region"
          placeholder="Выберите регион"
        />
      </div>

      <div class="form__item">
        <label for="calendar">Дата из МСК</label>
        <Calendar id="calendar" v-model="date" placeholder="Выберите дату" dateFormat="yy-mm-dd" />
      </div>

      <div class="form__item">
        <label for="fioCourier">ФИО курьера</label>
        <Dropdown
          id="fioCourier"
          v-model="couriersStore.courier"
          :options="couriersStore.courierOptions"
          optionLabel="courier"
          optionValue="id"
          placeholder="Выберите курьера"
        />
      </div>

      <div class="form__item">
        <label for="fioCourier">Дата прибытия в регион</label>
        <p class="form__item-panel">{{ dateToRegion }}</p>
      </div>

      <div class="form__item">
        <label for="fioCourier">Дата возврата в МСК</label>
        <p class="form__item-panel">{{ dateToBack }}</p>
      </div>

      <Button
        label="Добавить"
        class="form__button"
        @click="addNewRoute"
        :disabled="isDisabledRoute"
      />
    </div>

    <DataTable :value="routeListStore.trips" stripedRows class="mt-50">
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        sortable
      ></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import { useRegionsStore } from '@/stores/regions';
import { useRouteListStore } from '@/stores/routeList';
import { useCouriersStore } from '@/stores/couriers';
import { addDaysToDate, convertToYYYYMMDD } from '@/utils/handlerDate';
import type { CreateRoute } from '@/types/routeList';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';

const routeListStore = useRouteListStore();
const regionsStore = useRegionsStore();
const couriersStore = useCouriersStore();

const date = ref<Date | null>(null);
const dateToRegion = ref<string>('');
const dateToBack = ref<string>('');
const columns = ref([
  {
    field: 'id',
    header: 'ID поездки'
  },
  {
    field: 'region',
    header: 'Регион'
  },
  {
    field: 'courier',
    header: 'ID курьера'
  },
  {
    field: 'start',
    header: 'Старт из МСК'
  },
  {
    field: 'toregion',
    header: 'Дата прибытия в регион'
  },
  {
    field: 'back',
    header: 'Дата возвращения в МСК'
  }
]);

const isDisabledRoute = computed(() => {
  if (regionsStore.region && couriersStore.courier && date.value) {
    return false;
  } else {
    return true;
  }
});

const initDateRoute = () => {
  if (date.value && regionsStore.region) {
    dateToRegion.value = addDaysToDate(date.value, regionsStore.region.time);
    dateToBack.value = addDaysToDate(date.value, regionsStore.region.time);
  }
};

const addNewRoute = async () => {
  const newRoute: CreateRoute = {
    inRegion: regionsStore.region?.region as string,
    who: couriersStore.courier,
    start: convertToYYYYMMDD(date.value!),
    toRegion: dateToRegion.value,
    back: dateToBack.value
  };
  await routeListStore.сreateRoute(newRoute);
  resetAllData();
};

const resetAllData = () => {
  date.value = null;
  dateToRegion.value = '';
  dateToBack.value = '';
  couriersStore.resetData();
  regionsStore.resetData();
};

watchEffect(() => initDateRoute());
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;

  &__item {
    display: flex;
    flex-direction: column;
    row-gap: 5px;

    &-panel {
      background: #ffffff;
      padding: 0.5rem 0.75rem;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      height: 38px;
      line-height: 125%;
    }
  }

  &__button {
    align-self: flex-end;
  }
}
</style>
