import './assets/main.css'
import axios from 'axios';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

axios.defaults.baseURL = 'https://ingegneria-del-software-hqzd.onrender.com';

const app = createApp(App)

app.use(router)

app.mount('#app')