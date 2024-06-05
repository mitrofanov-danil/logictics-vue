<template>
  <div>
    <div class="flex flex_column r-gap-5">
      <label for="courier">Добавить курьера</label>
      <div class="flex c-gap-10">
        <InputText id="courier" v-model="newCourier" aria-describedby="courier-help" />
        <Button
          label="Добавить"
          @click="addNewCourier"
          :disabled="isDisabledCourier"
          :loading="couriersStore.isLoading"
        />
      </div>
    </div>

    <DataTable :value="couriersStore.courierOptions" stripedRows class="mt-25">
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
            @click="handleEditCourier(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            size="small"
            @click="handleDeleteCourier(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="openChangeDialog"
      modal
      header="Изменить данные курьера"
      :style="{ width: '30rem' }"
    >
      <div class="flex flex_j-between flex_a-center c-gap-5 mb-10">
        <label for="courierId">ID Курьера</label>
        <InputNumber id="courierId" v-model="courierData.id" placeholder="ID" />
      </div>

      <div class="flex flex_j-between flex_a-center c-gap-5 mb-10">
        <label for="courierFIO">ФИО</label>
        <InputText id="courierFIO" v-model="courierData.courier" placeholder="ФИО" />
      </div>

      <div class="flex flex_j-between flex_a-center c-gap-5 mb-10">
        <label for="courierBusytime">Загруженное время</label>
        <Calendar
          id="courierBusytime"
          v-model="courierData.busytime"
          placeholder="Выберите дату"
          dateFormat="yy-mm-dd"
        />
      </div>

      <div class="flex flex_j-between flex_a-center c-gap-5 mb-10">
        <label for="courierBusy">Занятый</label>
        <InputText id="courierBusy" v-model="courierData.busy" placeholder="Занятый" />
      </div>

      <div class="flex flex_j-end c-gap-5 mt-20">
        <Button
          type="button"
          label="Отмена"
          severity="secondary"
          @click="openChangeDialog = false"
          :loading="couriersStore.isLoading"
        ></Button>
        <Button
          type="button"
          label="Сохранить"
          @click="handleChangeData"
          :loading="couriersStore.isLoading"
          :disabled="isDisabledForm"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useCouriersStore } from '@/stores/couriers';
import type { Courier, CourierEdit } from '../types/couriers';
import { convertStringToDate, convertToYYYYMMDD } from '@/utils/handlerDate';
import { useConfirm } from 'primevue/useconfirm';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';

const initialCourierData: CourierEdit = {
  id: 0,
  courier: '',
  busytime: new Date(),
  busy: ''
};

const couriersStore = useCouriersStore();
const confirmDelete = useConfirm();

const openChangeDialog = ref<boolean>(false);
const newCourier = ref<string>('');
const courierData = reactive<CourierEdit>({ ...initialCourierData });
const columns = ref([
  {
    field: 'id',
    header: 'ID курьера'
  },
  {
    field: 'courier',
    header: 'ФИО'
  },
  {
    field: 'busytime',
    header: 'Загруженное время'
  },
  {
    field: 'busy',
    header: 'Занятый'
  }
]);

const isDisabledCourier = computed(() => {
  if (newCourier.value.length > 1) {
    return false;
  } else {
    return true;
  }
});

const isDisabledForm = computed(() => {
  const isEmpty = Object.values(courierData).some((el) => el === null || el === '');
  return isEmpty;
});

const addNewCourier = () => {
  couriersStore.сreateCourier(newCourier.value);
  newCourier.value = '';
};

const handleEditCourier = (data: Courier) => {
  openChangeDialog.value = true;
  Object.assign(courierData, {
    id: data.id,
    courier: data.courier,
    busytime: new Date(convertStringToDate(data.busytime)),
    busy: data.busy
  });
};

const handleDeleteCourier = async (data: Courier) => {
  confirmDelete.require({
    message: 'Вы хотите удалить эту запись?',
    header: 'Потдверждение',
    rejectLabel: 'Отмена',
    acceptLabel: 'Удалить',
    acceptClass: 'p-button-danger',
    accept: () => {
      couriersStore.deleteCourier(data.id);
    }
  });
};

const handleChangeData = async () => {
  const newCourierData: Courier = {
    id: courierData.id,
    courier: courierData.courier,
    busytime: convertToYYYYMMDD(courierData.busytime),
    busy: courierData.busy
  };
  await couriersStore.editCourier(newCourierData);
  openChangeDialog.value = false;
  resetForm();
};

const resetForm = () => {
  Object.assign(courierData, initialCourierData);
};
</script>

<style lang="scss" scoped>
.p-button.p-button-icon-only {
  width: 2rem;
  height: 2rem;
}
</style>
