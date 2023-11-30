import axios from 'axios'

import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

// axios实例
const request = axios.create({
    baseURL: '/api', // 待定
    timeout: 5000,
})

request.interceptors.request.use((config) => {
    const userStore = useUserStore();
    if (userStore.token) {
        config.headers.Authorization = userStore.token;
    }
    return config;
})
// 响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        let msg = '';
        console.log(error);
        const status = error.response.code;
        switch (status) {
            case 401:
                msg = 'token过期';
                break;
            case 403:
                msg = '请求地址错误';
                break;
            case 500:
                msg = '服务器出现问题';
                break;
            default:
                msg = '无网络';
        }
        ElMessage({
            type: 'error',
            message: msg
        });
        return Promise.reject(error);
    }
)
export default request;