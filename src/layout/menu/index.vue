<template>
    <template v-for="(item, index) in menuList" :key="index">
        <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path" @click="goRoute">
            <el-icon>
                <component :is="item.meta.icon" v-if="item.meta.icon"></component>
            </el-icon>
            <template #title>
                <span class="menu_title">{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
        <template v-if="item.children">
            <Menu v-if="item.children.length == 1" :menuList="item.children"></Menu>
            <el-sub-menu v-if="item.children.length > 1 && !item.meta.hidden" :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon" v-if="item.meta.icon"></component>
                    </el-icon>
                    <span class="menu_title">{{ item.meta.title }}</span>
                </template>
                <Menu :menuList="item.children" />
            </el-sub-menu>
        </template>
    </template>
</template>    

<script setup>
import { useRouter } from 'vue-router';
// 拿到父组件传来的路由配置
let props = defineProps(['menuList'])
let $router = useRouter();
const goRoute = (vc) => {
    $router.push((vc.indexPath).join('/'));
}
</script>

<script>
export default {
    name: 'Menu'
}
</script>

<style lang="scss" scoped>
.menu_title {
    font-size: 16px;
    height: 48px;
    line-height: 48px;
    font-weight: 700;
}
</style>