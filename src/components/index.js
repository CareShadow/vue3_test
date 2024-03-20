// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue';
import * as ELementPlusIconsVue from '@element-plus/icons-vue'
import VueDragResize from './VueDragResize/index.vue'
import CodeEditor from './CodeMirror/index.vue'
const allGloablComponent = { SvgIcon, CodeEditor, VueDragResize };
// 自定义插件
export default {
    install(app) {
        Object.keys(allGloablComponent).forEach(key => {
            app.component(key, allGloablComponent[key]);
        });
        for (const [key, component] of Object.entries(ELementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}