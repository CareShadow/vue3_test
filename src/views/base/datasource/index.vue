<template>
    <el-card class="box-card">
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="name" label="数据集名称" width="180" />
            <el-table-column prop="type" label="数据库类型" width="180" />
            <el-table-column prop="host" label="主机号" />
            <el-table-column prop="port" label="端口" width="180" />
            <el-table-column prop="createUser" label="创建人" width="180" />
            <el-table-column prop="createDate" label="创建时间" width="180" />
        </el-table>
    </el-card>
</template>

<script setup>
import { reqDataSourceList } from '@/api/base';
import { onMounted, ref } from 'vue';
let tableData = ref([]);
onMounted(() => {
    initTableData();
    console.log(1);
})

const initTableData = async () => {
    const reuslt = await reqDataSourceList();
    if (reuslt.code === 200) {
        tableData.value = reuslt.data.list;
        return 'ok'
    } else {
        return Promise.reject(new Error(result.msg));
    }
}
</script>

<style lang="scss" scoped></style>