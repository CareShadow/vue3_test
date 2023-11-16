<template>
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
</template>    

<script setup>
// 拿到父组件传来的路由配置
let props = defineProps(['menuList'])

</script>

<style lang="scss" scoped>
span {
    font-size: 16px;
    height: 48px;
    line-height: 48px;
    color: #cccccc;
    font-weight: 700;
}
</style>