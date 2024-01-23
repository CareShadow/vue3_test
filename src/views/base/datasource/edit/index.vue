<template>
    <div>
        <el-card class="box-card mi-tools">
            <div class="tools-flex">
                <el-button type="primary" :icon="ArrowLeft" @click="goHistory">返回</el-button>
                <div>
                    <el-button type="primary" @click="onSubmit(ruleFormRef)">
                        {{ insertOrEdit }}</el-button>
                    <el-button @click="close">关闭</el-button>
                </div>
            </div>

        </el-card>
        <el-card class="box-card">
            <el-form :model="form" :inline="true" :rules="rules" ref="ruleFormRef" label-width="120px">
                <el-form-item label="数据源名" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="数据库类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option label="MySQL" value="MySQL" />
                        <el-option label="Oracle" value="Oracle" />
                    </el-select>
                </el-form-item>
                <el-form-item label="主机名" prop="host">
                    <el-input v-model="form.host" />
                </el-form-item>
                <el-form-item label="端口" prop="port">
                    <el-input v-model="form.port" />
                </el-form-item>
                <el-form-item label="用户名" prop="user">
                    <el-input v-model="form.user" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" show-password v-model="form.password" />
                </el-form-item>
                <el-form-item label="数据库名" prop="databaseName">
                    <el-input v-model="form.databaseName" />
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
  
<script setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { reqInsert, reqGetDataSource, reqEditDataSource } from '@/api/base';
import { useRouter, useRoute } from 'vue-router';

let $router = useRouter();
let $route = useRoute();


// do not use same name with ref
let form = reactive({
    name: '',
    type: '',
    host: '',
    port: '',
    user: '',
    password: '',
    databaseName: '',
})

let insertOrEdit = ref();
const ruleFormRef = ref();

const rules = reactive({
    name: [
        { required: true, message: '请输入数据源名', trigger: 'blur' }
    ],
    type: [
        { required: true, message: '请选择数据库类型', trigger: 'blur' },
    ],
    host: [
        { required: true, message: '请输入主机名', trigger: 'blur' },
    ],
    port: [
        { required: true, message: '请输入端口号', trigger: 'blur' },
    ],
    user: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    databaseName: [
        { required: true, message: '请输入数据库名', trigger: 'blur' },
    ]
})

const fetchData = async () => {
    let datasourceId = $route.query.id;
    if (datasourceId) insertOrEdit.value = '修改';
    else { insertOrEdit.value = '新增'; return; }
    const result = await reqGetDataSource(datasourceId);
    if (result.code === 200) {
        // 重点,可以用Object.assign来复制过去
        Object.assign(form, result.data)
        return 'ok'
    } else {
        return Promise.reject(new Error(result.msg))
    }
}

onMounted(async () => {
    try {
        await fetchData();
    } catch (error) {
        ElMessage({
            message: error.message,
            type: 'error',
        })
    }
})

const insertDataSource = async (form) => {
    const result = await reqInsert(form);
    if (result.code == 200) {
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

const editDataSource = async (form) => {
    let result = await reqEditDataSource(form);
    let msg = '';
    let type = '';
    if (result.code === 200) {
        msg = '修改成功';
        type = 'success';
    } else {
        msg = result.msg;
        type = 'error';
    }
    ElMessage({
        message: msg,
        type: type,
    })
}

const onSubmit = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            insertOrEdit.value == '新增' ? insertDataSource(form) : editDataSource(form)
        } else {
            ElMessage({
                message: "请检查表单是否填写完整",
                type: 'error',
            })
        }
    })

}

const goHistory = () => {
    $router.back();
}

const close = () => {
    $router.push('/base/datasource')
}
</script>
  

<script setup>

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