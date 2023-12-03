import { defineStore } from 'pinia';
// 引入路由
import constantRoutes from '@/router/routes.js';
import { CLEAR_TOKEN, GET_TOKEN, SET_TOKEN } from '@/utils/token';
import { reqLogin, reqUserInfo } from '@/api/user';

// 创建小仓库
let useUserStore = defineStore('User', {
    // 小仓库存储数据地方
    state: () => {
        return {
            token: GET_TOKEN(),
            constantRoutes,
            username: '',
            avatar: ''
        };
    },
    // 异步|逻辑的地方
    actions: {
        async userLogin(userForm) {
            const result = await reqLogin(userForm)
            console.log(result);
            if (result.code === 200) {
                this.token = result.data
                SET_TOKEN(result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data))
            }
        },
        userLogout() {
            // 清除本地token及store中的token
            CLEAR_TOKEN();
            this.token = '';
        },
        async userInfo() {
            const result = await reqUserInfo();
            if (result.code === 200) {
                this.username = result.data;
            } else {
                return Promise.reject(new Error(result.data))
            }
        }
    },

    getters: {

    }
})
export default useUserStore;