import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router'; // Importér din router

const app = createApp(App);

app.use(router); // Tilføj router til app'en

app.mount('#app');

