import router from '@/router/index'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from './store/modules/user'
import pinia from './store'

//在与app同级的情况下使用store,得获取pinia，作为参数
const userStore = useUserStore(pinia);
// 全局路由前置守卫
router.beforeEach(async (to, from, next) => {
    nprogress.start();
    const token = userStore.token;
    const username = userStore.username;
    if (token) {
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            if (username) {
                next();
            } else {
                // 发请求获取用户信息
                userStore.userInfo();
                next();
            }
        }
    } else {
        if (to.path == '/login') {
            next();
        } else {
            next({ path: '/login' });
        }
    }
})
router.afterEach((to, from) => {
    nprogress.done();
})