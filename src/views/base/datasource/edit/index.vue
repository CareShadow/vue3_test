<template>
    <el-card class="box-card mi-tools">
        <div class="tools-flex">
            <el-button type="primary" :icon="ArrowLeft" @click="goHistory">返回</el-button>
            <div>
                <el-button type="primary" @click="onSubmit(ruleFormRef)">创建</el-button>
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
</template>
  
<script setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { reqInsert } from '@/api/base';
import { useRouter } from 'vue-router';

let $router = useRouter();
// do not use same name with ref
const form = reactive({
    name: '',
    type: '',
    host: '',
    port: '',
    user: '',
    password: '',
    databaseName: '',
})

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

const onSubmit = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            insertDataSource(form);
        } else {
            ElMessage({
                message: "请检查表单是否填写完整",
                type: 'error',
            })
        }
    })

}

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

const goHistory = () => {
    $router.back();
}

const close = () => {
    $router.push('/datasource')
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
        padding: 0 20px
    }
}
</style>