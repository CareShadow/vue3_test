<template>
    <el-menu background-color="#001529" text-color="#fff">
        <template v-for="(item, index) in menuList" :key="index">
            <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span class="menu_title">{{ item.meta.title }}</span>
            </el-menu-item>
            <el-menu-item v-if="item.children && item.children.length == 1 && !item.children[0].meta.hidden"
                :index="item.children[0].path">
                <!-- <span class="menu_title">{{ item.meta.title }}</span> -->
                <Menu :menuList="item.children" />
            </el-menu-item>
            <el-sub-menu v-if="item.children && item.children.length > 1 && !item.meta.hidden" :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span class="menu_title">{{ item.meta.title }}</span>
                </template>
                <Menu :menuList="item.children" />
            </el-sub-menu>
        </template>
    </el-menu>
</template>    

<script setup>
// 拿到父组件传来的路由配置
let props = defineProps(['menuList'])

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
    color: #cccccc;
    font-weight: 700;
}
</style>