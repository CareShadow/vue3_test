<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <el-icon style="margin-right: 10px;">
                <Expand />
            </el-icon>

            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item>MI-BASE</el-breadcrumb-item>
                <el-breadcrumb-item>数据源连接</el-breadcrumb-item>
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
    }

    .tabbar_right {
        display: flex;
        align-items: center;
        margin: 0 20px;
    }
}
</style>