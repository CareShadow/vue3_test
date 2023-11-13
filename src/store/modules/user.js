import { defineStore } from 'pinia';
// 创建小仓库
let useUserStore = defineStore('User', {
    // 小仓库存储数据地方
    state: () => {
        return {
            age: 18
        };
    },
    // 异步|逻辑的地方
    actions: {

    },

    getters: {

    }
})
export default useUserStore;