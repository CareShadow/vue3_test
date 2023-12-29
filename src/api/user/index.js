import request from "@/utils/request";

/**
 * 登录接口
 * @param {登录信息} data 
 * @returns 
 */
const reqLogin = (data) => request({
    method: 'post',
    url: '/admin/login',
    data
})

const reqUserInfo = () => requestt({
    method: 'get',
    url: '/admin/userInfo'
})

export { reqLogin, reqUserInfo }