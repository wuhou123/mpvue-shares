import $http from '@/utils/http'
import $config from '@/config'
const HOST = $config.DOMAIN_NAME_SERVICE

// 通知列表
export const list = data => {
  return $http('GET', `${HOST}/api/v1/baseNotices/queryPage`, { data })
}
// 详情
export const detail = data => {
  return $http('GET', `${HOST}/api/v1/baseNotices/queryNoticeById`, { data })
}
// 公告阅读
export const updatePageview = data => {
  return $http('GET', `${HOST}/api/v1/baseNotices/updatePageview`, { data })
}
