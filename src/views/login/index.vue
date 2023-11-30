<template>
    <div class="content">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="loginForm" :model="loginForm" :rules="rules" ref="ruleFormRef">
                    <h1>Hello</h1>
                    <h2>欢迎来到SMI平台</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.login"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="isLoading" class="loginButton" @click="login">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import useUserStore from '@/store/modules/user';
import { ElNotification } from 'element-plus';
import { reactive, ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { getMessage } from '@/utils/time'

let loginForm = reactive({ login: 'zhangsan', password: 'Liang2001...' });
let isLoading = ref(false);
const $router = useRouter();
const userStore = useUserStore();
const ruleFormRef = ref();
const validatePassUserName = (rule, value, callback) => {
    if (value.length < 5) {
        callback(new Error('用户名不能小于5位'));
    } else {
        callback();
    }
}
const validatePassPassWord = (rule, value, callback) => {
    if (value.length < 6) {
        callback(new Error('密码不能小于5位'));
    } else {
        callback();
    }
}
const rules = reactive({
    login: [{ validator: validatePassUserName, trigger: 'change' }],
    password: [{ validator: validatePassPassWord, trigger: 'change' }]
})

const login = async () => {
    await ruleFormRef.value.validate();
    isLoading.value = true;
    try {
        isLoading.value = false;
        await userStore.userLogin(loginForm);
        $router.push("/")
        ElNotification({
            type: 'success',
            title: 'Hello,' + getMessage() + '好',
            message: '欢迎回来'
        })
    } catch (error) {
        isLoading.value = false;
        ElNotification({
            type: 'error',
            message: error.message
        })
    }
}
</script>

<script>
export default {
    name: 'Login'
}
</script>

<style scoped lang="scss">
.content {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .loginForm {
        position: relative;
        top: 30vh;
        width: 80%;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            font-size: 40px;
            color: white;
        }

        h2 {
            font-size: 25px;
            color: white;
            margin: 20px 0;
        }

        .loginButton {
            width: 100%;
        }
    }
}
</style>