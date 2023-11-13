import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.css'
import 'element-plus/dist/index.css'
// icons.js导入全部的svg图表
import '@/assets/icons/icons.js'
import router from '@/router/index.js'
import pinia from '@/store/index.js'


const app = createApp(App)
app.use(router);
app.use(pinia);
app.mount('#app');
