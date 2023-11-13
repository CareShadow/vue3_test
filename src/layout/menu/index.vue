<template>
    <el-scrollbar class="slider_scrollbar">
        <el-menu background-color="#001529" text-color="#fff">
            <el-sub-menu index="1">
                <template #title>
                    <span>MI_BASE</span>
                </template>
                <el-menu-item index="1-1">数据源连接</el-menu-item>
                <el-menu-item index="1-2">数据集</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <span>MI_IDA</span>
                </template>
                <el-menu-item index="2-1">图表开发</el-menu-item>
                <el-menu-item index="2-2">报表开发</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="3">MI_IDG</el-menu-item>
            <el-menu-item index="4">MI_IDF</el-menu-item>
        </el-menu>
    </el-scrollbar>
</template>    

<script setup>
</script>

<style scoped>
.slider_scrollbar {
    width: 100%;
    height: calc(100vh - 50px);
}
</style>