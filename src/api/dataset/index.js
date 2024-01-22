import request from "@/utils/request";

/**
 * 新增数据集
 * @param {数据集实体} data 
 * @returns 
 */
const reqInserDataSet = (data) => request({
    method: 'post',
    url: '/dataset/insert',
    data
})

/**
 * 数据集列表
 * @returns 
 */
const reqListDataSet = () => request({
    method: 'get',
    url: '/dataset/list'
})

/**
 * 编辑数据集
 * @param {数据集实体} data 
 * @returns 
 */
const reqEditDataSet = (data) => request({
    method: 'post',
    url: '/dataset/edit',
    data
})

/**
 * 获取数据集信息
 * @param {数据集ID} datasetId 
 * @returns 
 */
const reqGetDataSet = (datasetId) => request({
    method: 'get',
    url: `/dataset/get/${datasetId}`,
})


export { reqInserDataSet, reqListDataSet, reqEditDataSet, reqGetDataSet }