<template>
    <div>
        <el-card class="box-card mi-tools">
            <el-button type="primary" :icon="Plus" @click="insertDataSet">新增</el-button>
        </el-card>
        <el-card class="box-card">
            <el-table :data="datasetList" stripe style="width: 100%">
                <el-table-column prop="name" label="数据集名称" align="center" width="200" />
                <el-table-column prop="type" label="数据集类型" align="center" width="200" />
                <el-table-column prop="sourceName" label="数据源" align="center" width="200" />
                <el-table-column prop="createUser" label="创建人" align="center" width="200" />
                <el-table-column prop="createDate" label="创建时间" align="center" width="200" />
                <el-table-column label="操作" fixed="right" align="center">
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="editDataSet(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue';
import { ref, onMounted } from 'vue';
import { reqListDataSet } from '@/api/dataset/index';

let datasetList = ref([]);

onMounted(() => {
    initTableData();
})

const initTableData = async () => {
    const result = await reqListDataSet();
    if (result.code === 200) {
        datasetList.value = result.data.list;
        return 'ok'
    } else {
        return Promise.reject(new Error(result.msg));
    }
}

const insertDataSet = () => { }

const editDataSet = () => { }

const handleDelete = () => { }
</script>

<style lang="scss" scoped>
.mi-tools {
    margin-bottom: 10px;
}
</style>