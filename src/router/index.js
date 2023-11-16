import { createRouter, createWebHashHistory } from 'vue-router';
import constantRoutes from './routes.js';
// 创建路由器
let router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    scrollBehavior() {
        return {
            top: 0,
            left: 0
        }
    }
})

export default router;