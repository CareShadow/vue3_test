<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <el-icon style="margin-right: 10px;" @click="changeTabberStatus">
                <component :is="tabbarStore.openTabbar ? 'Expand' : 'Fold'"></component>
            </el-icon>

            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title"
                    :to="item.path">
                    <div class="dev_breadcrumb">
                        <el-icon style="margin: 0 10px 0 0;">
                            <component :is="item.meta.icon"></component>
                        </el-icon>
                        {{ item.meta.title }}
                    </div>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tabbar_right">
            <el-button type="primary" size="small" icon="Refresh" circle></el-button>
            <el-button type="primary" size="small" icon="FullScreen" circle></el-button>
            <el-button type="primary" size="small" icon="Setting" circle></el-button>
            <img src="@/assets/logo.png" style="width: 24px;height: 24px;margin: 0px 10px;">
            <el-dropdown>
                <span class="el-dropdown-link" style="display: flex;">
                    Admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import useTabbarStore from '@/store/modules/tabbar'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
let tabbarStore = useTabbarStore();
let $route = useRoute();
onMounted(() => {
    console.log($route);
})
const changeTabberStatus = () => {
    tabbarStore.openTabbar = !tabbarStore.openTabbar
}
</script>

<script>
export default {
    name: 'Tabbar'
}
</script>

<style lang="scss" scoped>
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;


        .dev_breadcrumb {
            display: flex;
        }
    }

    .tabbar_right {
        display: flex;
        align-items: center;
        margin: 0 20px;
    }
}
</style>