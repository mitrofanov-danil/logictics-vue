<template>
  <div>
    <div class="flex flex_column r-gap-5">
      <label for="newRegion">Добавление региона</label>
      <div class="flex c-gap-10">
        <InputText id="newRegion" v-model="newRegion" />
        <Button
          label="Добавить"
          @click="addNewRegion"
          :disabled="isDisabledRegion"
          :loading="regionsStore.isLoading"
        />
      </div>
    </div>

    <DataTable :value="regionsStore.regionOptions" stripedRows class="mt-25">
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        sortable
      ></Column>

      <Column style="min-width: 6rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-5"
            @click="handleEditRegion(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            size="small"
            @click="handleDeleteRegion(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="openChangeDialog"
      modal
      header="Изменить данные региона"
      :style="{ width: '30rem' }"
    >
      <div class="flex flex_j-between flex_a-center c-gap-5 mb-10">
        <label for="regionId">ID региона</label>
        <InputNumber id="regionId" v-model="regionData.id" placeholder="ID" />
      </div>

      <div class="flex flex_j-between flex_a-center c-gap-5 mb-10">
        <label for="regionName">Регион</label>
        <InputText id="regionName" v-model="regionData.region" placeholder="Регион" />
      </div>

      <div class="flex flex_j-between flex_a-center c-gap-5 mb-10">
        <label for="regionTime">Время</label>
        <InputText id="regionTime" v-model="regionData.time" placeholder="Время" />
      </div>

      <div class="flex flex_j-end c-gap-5 mt-20">
        <Button
          type="button"
          label="Отмена"
          severity="secondary"
          @click="openChangeDialog = false"
          :loading="regionsStore.isLoading"
        ></Button>
        <Button
          type="button"
          label="Сохранить"
          @click="handleChangeData"
          :loading="regionsStore.isLoading"
          :disabled="isDisabledForm"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useRegionsStore } from '@/stores/regions';
import type { Region } from '../types/regions';
import { useConfirm } from 'primevue/useconfirm';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const initialRegionData: Region = {
  id: 0,
  region: '',
  time: ''
};

const regionsStore = useRegionsStore();
const confirmDelete = useConfirm();

const openChangeDialog = ref<boolean>(false);
const newRegion = ref<string>('');
const regionData = reactive<Region>({ ...initialRegionData });
const columns = ref([
  {
    field: 'id',
    header: 'ID Региона'
  },
  {
    field: 'region',
    header: 'Название региона'
  },
  {
    field: 'time',
    header: 'Время'
  }
]);

const isDisabledRegion = computed(() => {
  if (newRegion.value.length > 1) {
    return false;
  } else {
    return true;
  }
});

const isDisabledForm = computed(() => {
  const isEmpty = Object.values(regionData).some((el) => el === null || el === '');
  return isEmpty;
});

const addNewRegion = () => {
  regionsStore.сreateRegion(newRegion.value);
  newRegion.value = '';
};

const handleEditRegion = (data: any) => {
  openChangeDialog.value = true;
  Object.assign(regionData, data);
};

const handleDeleteRegion = async (data: any) => {
  confirmDelete.require({
    message: 'Вы хотите удалить эту запись?',
    header: 'Потдверждение',
    rejectLabel: 'Отмена',
    acceptLabel: 'Удалить',
    acceptClass: 'p-button-danger',
    accept: () => {
      regionsStore.deleteRegion(data.id);
    }
  });
};

const handleChangeData = async () => {
  await regionsStore.editRegion(regionData);
  openChangeDialog.value = false;
  resetForm();
};

const resetForm = () => {
  Object.assign(regionData, initialRegionData);
};
</script>

<style lang="scss" scoped>
.p-button.p-button-icon-only {
  width: 2rem;
  height: 2rem;
}
</style>
