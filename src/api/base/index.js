import request from "@/utils/request";

/**
 * 数据源接口
 * @param {数据源信息} data 
 * @returns 
 */
const reqDataSourceList = () => request.get(
    '/base/list',
)


export { reqDataSourceList }