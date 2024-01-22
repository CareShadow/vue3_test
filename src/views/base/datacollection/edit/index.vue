<template>
    <div>
        <el-card class="box-card mi-tools">
            <div class="tools-flex">
                <el-button type="primary" :icon="ArrowLeft" @click="goHistory">返回</el-button>
                <div>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
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
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { reqEnumsData } from '@/api/base/index';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { message } from '@/utils/message';
import { reqInserDataSet } from '@/api/dataset/index';
import { ArrowLeft } from '@element-plus/icons-vue';

let $router = useRouter();
const ruleFormRef = ref();

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
    executeSql: 'select * \nfrom table'
})

let dataSourceEnums = ref([]);

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

const onSubmit = async () => {
    await ruleFormRef.value.validate(async (valid, fileds) => {
        if (valid) {
            try {
                await insertDataSet(dataset);
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

const execute = () => {
    alert('执行中' + code.value)
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