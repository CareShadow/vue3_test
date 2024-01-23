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

const reqEditDataSource = (datasource) => request({
    method: 'post',
    url: '/base/edit',
    data: datasource
})

const reqDelete = (dataSourceId) => request({
    method: 'get',
    url: `/base/delete/${dataSourceId}`
})

const reqEnumsData = () => request({
    method: 'get',
    url: '/base/enums/list'
})

const reqExecuteSQL = (data) => request({
    method: 'post',
    url: '/base/executeSql',
    data
})


export { reqDataSourceList, reqConnect, reqInsert, reqGetDataSource, reqEditDataSource, reqDelete, reqEnumsData, reqExecuteSQL }