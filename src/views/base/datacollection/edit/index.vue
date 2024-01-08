<template>
    <div>
        <el-card class="box-card mi-tools">
            <div class="tools-flex">
                <el-button type="primary" :icon="ArrowLeft" @click="goHistory">返回</el-button>
                <div>
                    <el-button type="primary" @click="onSubmit(ruleFormRef)">保存</el-button>
                    <el-button type="success" @click="execute">执行</el-button>
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
        <div>
            <CodeEditor @changeByEditor="changeCode" />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';

let $router = useRouter();
let code = ref('select * \nfrom table');

let form = reactive({
    name: '',
    type: '',
    host: '',
    port: '',
    user: '',
    password: '',
    databaseName: '',
})

const changeCode = (value) => {
    code.value = value
}

const goHistory = () => {
    $router.back();
}

const onSubmit = () => {
    alert("保存成功")
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