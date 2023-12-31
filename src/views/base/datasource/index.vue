<template>
    <div>
        <el-card class="box-card mi-tools">
            <el-button type="primary" :icon="Plus" @click="insertDataSource">新增</el-button>
        </el-card>
        <el-card class="box-card">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="数据源名称" align="center" width="150" />
                <el-table-column prop="type" label="数据库类型" align="center" width="150" />
                <el-table-column prop="host" label="主机号" align="center" width="150" />
                <el-table-column prop="port" label="端口" align="center" width="150" />
                <el-table-column prop="databaseName" label="数据库名" align="center" width="150" />
                <el-table-column prop="createUser" label="创建人" align="center" width="150" />
                <el-table-column prop="createDate" label="创建时间" align="center" width="200" />
                <el-table-column label="操作" fixed="right" align="center" width="220">
                    <template #default="scope">
                        <el-button size="small" type="success" @click="handleConnect(scope.row)">连接</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button size="small" type="primary" @click="editDataSource(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { reqDataSourceList, reqConnect } from '@/api/base';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
let tableData = ref([]);
let $router = useRouter();
onMounted(() => {
    initTableData();
})

const initTableData = async () => {
    const result = await reqDataSourceList();
    if (result.code === 200) {
        tableData.value = result.data.list;
        return 'ok'
    } else {
        return Promise.reject(new Error(result.msg));
    }
}

const handleConnect = async (row) => {
    const result = await reqConnect(row.id);
    if (result.code === 200) {
        ElMessage({
            message: result.msg,
            type: 'success',
        })
        return 'ok'
    } else {
        ElMessage({
            message: result.msg,
            type: 'error',
        })
    }
}

const insertDataSource = () => {
    $router.push('/datasource/edit')
}

const editDataSource = (row) => {
    $router.push({ path: '/datasource/edit', query: { id: row.id } })
}
</script>

<style lang="scss" scoped>
.mi-tools {
    margin-bottom: 10px;
}
</style>