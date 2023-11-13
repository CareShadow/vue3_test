// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue';

const allGloablComponent = { SvgIcon };
// 自定义插件
export default {
    install(app) {
        Object.keys(allGloablComponent).forEach(key => {
            app.component(key)
        })
    }
}