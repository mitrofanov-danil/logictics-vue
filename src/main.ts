import 'primevue/resources/themes/aura-light-green/theme.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import './assets/main.scss';
import 'primeicons/primeicons.css';

export const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue);
app.use(router);
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');
