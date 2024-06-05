<template>
  <main class="flex flex_column r-gap-50">
    <Card>
      <template #title>Курьер</template>
      <template #content>
        <CouriersView />
      </template>
    </Card>

    <Card>
      <template #title>Регион</template>
      <template #content>
        <RegionsView />
      </template>
    </Card>

    <Card>
      <template #title>Отправка в рейс</template>
      <template #content>
        <DepartureTrip />
      </template>
    </Card>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useLoadingStore } from '@/stores/loading';
import { useRegionsStore } from '@/stores/regions';
import { useRouteListStore } from '@/stores/routeList';
import { useCouriersStore } from '@/stores/couriers';
import Card from 'primevue/card';
import CouriersView from '@/components/CouriersView.vue';
import DepartureTrip from '@/components/DepartureTrip.vue';
import RegionsView from '@/components/RegionsView.vue';

const routeListStore = useRouteListStore();
const regionsStore = useRegionsStore();
const couriersStore = useCouriersStore();
const { setLoading } = useLoadingStore();

onBeforeMount(async () => {
  setLoading(true);
  const promises = [
    routeListStore.getRouteList(),
    regionsStore.getRegions(),
    couriersStore.getCouriers()
  ];
  Promise.allSettled(promises).then(() => setLoading(false));
});
</script>
