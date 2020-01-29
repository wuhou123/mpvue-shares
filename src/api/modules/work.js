// 工作台api
import $http from '@/utils/http'
import $config from '@/config'
const HOST = $config.DOMAIN_NAME_SERVICE

// 报价搜索
export const queryLines = params => {
 return $http('POST', `${HOST}/api/v1/quote/queryLines`, params)
}
// 产品查询
export const queryProducts = params => {
 return $http('POST', `${HOST}/api/v1/quote/queryProducts`, params)
}
// 字典查询
export const queryTransportType = params => {
 return $http('GET', `${HOST}/api/v1/quote/queryTransportType`, params)
}
// 运输地址
export const regionLists = params => {
 return $http('GET', `${HOST}/api/v1/pubs/mdm/regionLists`, params)
}
// 入库单查询
export const po2b = params => {
 return $http('GET', `${HOST}/api/v1/po2b`, params)
}
// 入库单详情
export const detailInfo = params => {
 return $http('GET', `${HOST}/api/v1/po/detail/info`, params)
}
// 入库单状态
export const detailflow = params => {
 return $http('GET', `${HOST}/api/v1/po/detail/flow`, params)
}
// 入库单货品类型
export const po2bDetail = params => {
 return $http('GET', `${HOST}/api/v1/po2b/content/${params.data.poId}`, params)
}
// 增值单查询
export const incrementQuery = params => {
 return $http('GET', `${HOST}/api/v1/addedservice/query`, params)
}
// 增值单详情
export const incrementDetail = params => {
 return $http('GET', `${HOST}/api/v1/addedservice/detail/${params.data.payNo}`, params)
}
// 一级增值类目
export const firstcategory = params => {
 return $http('GET', `${HOST}/api/v1/addedservice/firstcategory`, params)
}
// 二级增值类目
export const secondcategory = params => {
 return $http('GET', `${HOST}/api/v1/addedservice/secondcategory`, params)
}

