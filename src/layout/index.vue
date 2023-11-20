<template>
    <div class="layout_container">
        <div class="layout_slider">
            <Logo />
            <el-scrollbar class="slider_scrollbar">
                <el-menu :default-active="$router.path" background-color="#001529" text-color="#fff">
                    <Menu :menuList="userStore.constantRoutes" />
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar">
            <Tabbar />
        </div>
        <div class="layout_main">
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

let userStore = useUserStore();
let $router = useRoute();
</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;
}

.layout_container .layout_slider {
    width: 260px;
    background-color: #001529;
    height: 100vh;
}

.layout_container .layout_tabbar {
    position: fixed;
    width: calc(100% - 260px);
    height: 50px;
    top: 0px;
    left: 260px;
}

.layout_container .layout_main {
    position: absolute;
    width: calc(100% - 260px);
    height: calc(100vh - 50px);
    background-color: yellowgreen;
    left: 260px;
    top: 50px;
}

.slider_scrollbar {
    width: 100%;
    height: calc(100vh - 50px);

    .el-menu {
        border-right: none;
    }

}
</style>