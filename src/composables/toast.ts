import { useToast } from 'primevue/usetoast';
import { app } from '@/main';

const lifeTime = 5000;
const toast: typeof useToast = () => app.config.globalProperties.$toast;

export const successToast = (title: string, body: string): void => {
  toast().add({ severity: 'success', summary: title, detail: body, life: lifeTime });
};

export const errorToast = (title: string, body: string): void => {
  toast().add({ severity: 'error', summary: title, detail: body, life: lifeTime });
};
