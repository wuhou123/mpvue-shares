// 数据统计api
import $http from '@/utils/http'
import $config from '@/config'
const HOST = $config.DOMAIN_NAME_SERVICE

// 订单趋势
export const trend = params => {
  return $http('GET', `${HOST}/api/v1/outs/trend`, params)
}
// 公告
export const queryNoticeByCache = params => {
  return $http('GET', `${HOST}/api/v1/baseNotices/queryNoticeByCache`, params)
}
// 订单作业情况
export const workFinish = params => {
  return $http('GET', `${HOST}/api/v1/outs/workFinish`, params)
}
