import request from "@/utils/request";

/**
 * 数据源接口
 * @param {数据源信息} data 
 * @returns 
 */
const reqDataSourceList = () => request.get(
    '/base/list',
)

const reqConnect = (dataSourceId) => request.post(
    '/base/connect',
    {
        dataSourceId
    },
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
)

const reqInsert = (dataSource) => request.post(
    '/base/insert',
    dataSource
)


export { reqDataSourceList, reqConnect, reqInsert }