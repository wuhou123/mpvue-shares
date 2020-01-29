// 运单查询api
import $http from '@/utils/http'
import $config from '@/config'
const HOST = $config.DOMAIN_NAME_SERVICE

// 订单详情
export const expressDetail = params => {
  return $http('GET', `${HOST}/api/v1/express/detail`, params)
}

// 订单节点
export const flowInfo = params => {
  return $http('GET', `${HOST}/api/v1/express/queryflowInfoNodes`, params)
}

// 温度地图点位
export const gpsTemp = params => {
  return $http('GET', `${HOST}/api/v1/express/gpsTemp`, params)
}

// 调拨查询
export const queryRequisitionServe = params => {
  return $http('GET', `${HOST}/api/v1/serve/queryRequisitionServe`, params)
}
