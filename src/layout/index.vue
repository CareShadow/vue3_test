<template>
    <div class="layout_container">
        <div class="layout_slider" :class="{ tabbar_close: !tabbarStore.openTabbar }">
            <Logo />
            <el-scrollbar class="slider_scrollbar">
                <el-menu :collapse="!tabbarStore.openTabbar" :default-active="$router.path" background-color="#001529"
                    text-color="#fff">
                    <Menu :menuList="userStore.constantRoutes" />
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar" :class="{ right_tabbar_close: !tabbarStore.openTabbar }">
            <Tabbar />
        </div>
        <div class="layout_main" :class="{ right_tabbar_close: !tabbarStore.openTabbar }">
            <Main />
        </div>
    </div>
</template>

<script setup>
import Logo from '@/layout/logo/index'
import Menu from '@/layout/menu/index'
import Main from '@/layout/main/index'
import Tabbar from '@/layout/tabbar/index'
import { useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user';
import useTabbarStore from '@/store/modules/tabbar'

let userStore = useUserStore();
let tabbarStore = useTabbarStore();
let $router = useRoute();
</script>

<script>
export default {
    name: 'Layout'
}
</script>

<style lang="scss" scoped>
.layout_container {
    width: 100vw;
    height: 100vh;

    .layout_slider {
        width: 260px;
        background-color: #001529;
        height: 100vh;
        transition: all .3s;
    }

    .tabbar_close {
        width: 70px;
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100vw - 260px);
        height: 50px;
        top: 0px;
        left: 260px;
        transition: all .3s;
    }

    .layout_main {
        position: absolute;
        width: calc(100vw - 260px);
        height: calc(100vh - 50px);
        left: 260px;
        padding: 20px;
        top: 50px;
        transition: all .3s;
    }

    .right_tabbar_close {
        width: calc(100% - 70px);
        left: 70px;
    }

    .slider_scrollbar {
        width: 100%;
        height: calc(100vh - 50px);

        .el-menu {
            border-right: none;
        }
    }
}
</style>