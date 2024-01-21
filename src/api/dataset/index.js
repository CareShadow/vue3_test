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


export { reqInserDataSet }