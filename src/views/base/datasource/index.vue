<template>
    <el-card class="box-card">
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="name" label="数据集名称" align="center" />
            <el-table-column prop="type" label="数据库类型" align="center" />
            <el-table-column prop="host" label="主机号" align="center" />
            <el-table-column prop="port" label="端口" align="center" />
            <el-table-column prop="createUser" label="创建人" align="center" />
            <el-table-column prop="createDate" label="创建时间" align="center" />
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button size="small" @click="handleConnect(scope.row)">测试连接</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { reqDataSourceList, reqConnect } from '@/api/base';
import { onMounted, ref } from 'vue';
let tableData = ref([]);
onMounted(() => {
    initTableData();
})

const initTableData = async function () {
    const reuslt = await reqDataSourceList();
    if (reuslt.code === 200) {
        tableData.value = reuslt.data.list;
        return 'ok'
    } else {
        return Promise.reject(new Error(result.msg));
    }
}

const handleConnect = async function (row) {
    const result = await reqConnect(row.id);
    if (result.code === 200) {
        ElMessage({
            message: result.data,
            type: 'success',
        })
        return 'ok'
    } else {
        ElMessage({
            message: result.data,
            type: 'error',
        })
    }
}
</script>

<style lang="scss" scoped></style>