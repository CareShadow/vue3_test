import { defineStore } from 'pinia';
// 引入路由
import constantRoutes from '@/router/routes.js';
import { GET_TOKEN } from '@/utils/token';

// 创建小仓库
let useUserStore = defineStore('User', {
    // 小仓库存储数据地方
    state: () => {
        return {
            token: GET_TOKEN(),
            constantRoutes,
            username: ''
        };
    },
    // 异步|逻辑的地方
    actions: {

    },

    getters: {

    }
})
export default useUserStore;