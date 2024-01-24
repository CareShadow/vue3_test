<template>
    <div>
        <el-card class="box-card mi-tools">
            <div class="tools-flex">
                <el-button type="primary" :icon="ArrowLeft" @click="goHistory">返回</el-button>
                <div>
                    <el-button type="primary" @click="onSubmit"> {{ insertOrEdit }}</el-button>
                    <el-button type="success" @click="execute">执行</el-button>
                    <el-button @click="close">关闭</el-button>
                </div>
            </div>
        </el-card>
        <el-card class="box-card">
            <el-form :model="dataset" :inline="true" :rules="rules" ref="ruleFormRef" label-width="120px">
                <el-form-item label="数据集" prop="name">
                    <el-input v-model="dataset.name" />
                </el-form-item>
                <el-form-item label="数据集类型" prop="type">
                    <el-select v-model="dataset.type" placeholder="请选择">
                        <el-option label="SQL" value="SQL" />
                    </el-select>
                </el-form-item>
                <el-form-item label="数据源" prop="sourceId">
                    <el-select v-model="dataset.sourceId" placeholder="请选择">
                        <el-option v-for="item in dataSourceEnums" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
        <div>
            <CodeEditor v-model="dataset.executeSql" />
        </div>
        <div>
            <el-table :data="resultSet" max-height="280px" table-layout="auto">
                <el-table-column v-for="(item, index) in resultName" :prop="item" :label="item" :key="index" />
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { reqEnumsData, reqExecuteSQL } from '@/api/base/index';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import { message } from '@/utils/message';
import { reqInserDataSet, reqGetDataSet, reqEditDataSet } from '@/api/dataset/index';
import { ArrowLeft } from '@element-plus/icons-vue';

let $router = useRouter();
let $route = useRoute();
const ruleFormRef = ref();
let insertOrEdit = ref();
let resultSet = ref([]);
let resultName = ref([]);

const rules = reactive({
    name: [
        { required: true, message: '请输入数据集名', trigger: 'blur' }
    ],
    type: [
        { required: true, message: '请选择数据集类型', trigger: 'blur' },
    ],
    sourceId: [
        { required: true, message: '请选择数据源', trigger: 'blur' },
    ],
    executeSql: [
        { required: true, message: '请输入执行SQL', trigger: 'blur' },
    ]
})

onMounted(async () => {
    try {
        await reqSourceEnums();
        await fetchData();
    } catch (error) {
        ElNotification({
            type: 'error',
            message: error.message
        })
    }
})

let dataset = reactive({
    name: '',
    type: '',
    sourceId: '',
    executeSql: ''
})

let dataSourceEnums = ref([]);

const fetchData = async () => {
    let datasetId = $route.query.id;
    if (datasetId) insertOrEdit.value = '保存';
    else { insertOrEdit.value = '新增'; return; }
    const result = await reqGetDataSet(datasetId);
    if (result.code === 200) {
        Object.assign(dataset, result.data);
        return 'ok';
    } else {
        return Promise.reject(new Error(result.msg));
    }
}

const reqSourceEnums = async () => {
    let result = await reqEnumsData()
    if (result.code === 200) {
        dataSourceEnums.value = result.data;
        return 'ok'
    } else {
        return Promise.reject(new Error(result.msg))
    }
}

const insertDataSet = async (dataset) => {
    let result = await reqInserDataSet(dataset);
    if (result.code === 200) {
        message(result.msg, 'success');
        return 'ok';
    } else {
        return Promise.reject(new Error(result.msg))
    }
}

const editDataSet = async (dataset) => {
    let result = await reqEditDataSet(dataset);
    let msg = '';
    let type = '';
    if (result.code === 200) {
        msg = '修改成功';
        type = 'success';
    } else {
        msg = result.msg;
        type = 'error';
    }
    message(msg, type)
}

const onSubmit = async () => {
    await ruleFormRef.value.validate(async (valid, fileds) => {
        if (valid) {
            try {
                insertOrEdit.value == '新增' ? await insertDataSet(dataset) : await editDataSet(dataset);
            } catch (error) {
                message(error.message, 'error')
            }
        } else {
            message("请检查表单是否填写完整", 'error')
        }
    });
}

const goHistory = () => {
    $router.back();
}

const execute = async () => {
    await ruleFormRef.value.validate(async (valid, fileds) => {
        if (valid) {
            try {
                const result = await reqExecuteSQL(dataset);
                if (result.code === 200) {
                    if (result.data != null) {
                        resultSet.value = result.data;
                        resultName.value = Object.keys(resultSet.value[0]);
                    }
                    message(result.msg, 'success');
                } else {
                    message(result.msg, 'error');
                }

            } catch (error) {
                message(error.message, 'error')
            }
        } else {
            message("请检查表单是否填写完整", 'error')
        }
    });
}

const close = () => {
    $router.push('/base/datacollection')
}
</script>

<style lang="scss" scoped>
.mi-tools {
    margin-bottom: 10px;

    .tools-flex {
        display: flex;
        justify-content: space-between;
    }
}
</style>