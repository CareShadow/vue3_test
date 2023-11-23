import { defineStore } from "pinia";

// 创建小仓库
let useTabbarStore = defineStore('Tabbar', {
    // 小仓库存储数据地方
    state: () => {
        return {
            openTabbar: true,
            refresh: false
        };
    },
    // 异步|逻辑的地方
    actions: {

    },

    getters: {

    }
})
export default useTabbarStore;