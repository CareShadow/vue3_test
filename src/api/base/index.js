import request from "@/utils/request";

/**
 * 数据源接口
 * @param {数据源信息} data 
 * @returns 
 */
const reqDataSourceList = () => request({
    method: 'get',
    url: '/base/list'
})

const reqConnect = (dataSourceId) => request({
    method: 'post',
    url: '/base/connect',
    data: { dataSourceId },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

const reqInsert = (dataSource) => request({
    method: 'post',
    url: '/base/insert',
    data: dataSource
})

const reqGetDataSource = (datasourceId) => request({
    method: 'get',
    url: `/base/get/${datasourceId}`,
})


export { reqDataSourceList, reqConnect, reqInsert, reqGetDataSource }