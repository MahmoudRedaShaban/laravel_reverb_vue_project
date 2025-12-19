import { createApp } from 'vue'
import App from './App.vue'
import { echo } from './plugins/echo';
import router from './router';
import axios from 'axios';
import './main.css'
import useAuth from './composables/useAuth';
import {createPinia} from 'pinia';
axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;


const pinia = createPinia();

const app =createApp(App);
const {attemp} = useAuth();



app.use(router);
app.use(echo);
app.use(pinia);

attemp().then(() => {
    app.mount('#app');
}).catch(()=>{
    app.mount('#app');
    router.push('/login');
})