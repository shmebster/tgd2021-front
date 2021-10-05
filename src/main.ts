import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import mitt from "mitt";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.scss';
const app = createApp(App);
const emitter = mitt();
app.provide('emitter', emitter);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');

