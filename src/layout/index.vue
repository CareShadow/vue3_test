<template>
    <div class="layout_container">
        <div class="layout_slider">
            <Logo />
            <el-scrollbar class="slider_scrollbar">
                <Menu :menuList="userStore.constantRoutes" />
            </el-scrollbar>
        </div>
        <div class="layout_tabbar">456</div>
        <div class="layout_main">789</div>
    </div>
</template>

<script setup>
import Logo from '@/layout/logo/index'
import Menu from '@/layout/menu/index'
import useUserStore from '@/store/modules/user';

let userStore = useUserStore();
</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;
    background-color: red
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
    background-color: cyan;
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