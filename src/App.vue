<template>
  <Toast position="bottom-right" />
  <ConfirmDialog />
  <transition name="fade">
    <div class="loading" v-if="isLoading">
      <ProgressSpinner />
    </div>
  </transition>

  <div class="layout">
    <header>Управление логистикой</header>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router';
import { useLoadingStore } from '@/stores/loading';
import ConfirmDialog from 'primevue/confirmdialog';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';

const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);
</script>

<style lang="scss">
header {
  font-size: 32px;
  text-align: center;
  margin-bottom: 35px;
}

.layout {
  max-width: 1440px;
  margin: 25px auto;
  padding: 0 25px;
}

.loading {
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: #f6f7f8;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
