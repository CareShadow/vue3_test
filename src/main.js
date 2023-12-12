import { createApp } from 'vue'
import App from './App.vue'
// 引入全局样式
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
// icons.js导入全部的svg图表
import '@/assets/icons/icons.js'
import router from '@/router/index.js'
import pinia from '@/store/index.js'
import globalComponent from '@/components/index.js'
import './permission'

const app = createApp(App)
app.use(router);
app.use(pinia);
app.use(globalComponent);
app.mount('#app');
