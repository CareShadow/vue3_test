import request from "@/utils/request";

/**
 * 登录接口
 * @param {登录信息} data 
 * @returns 
 */
const reqLogin = (data) => request.post(
    '/admin/login',
    data
)

const reqUserInfo = () => request.get(
    '/admin/userInfo'
)

export { reqLogin, reqUserInfo }