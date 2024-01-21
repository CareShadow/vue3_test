import { ElMessage, ElNotification } from 'element-plus';

const message = (msg, type) => {
    ElMessage({
        message: msg,
        type: type
    })
}

const notification = (msg, type) => {
    ElNotification({
        message: msg,
        type: type
    })
}

export { message, notification }