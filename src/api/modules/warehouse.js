import $http from '@/utils/http'
import $config from '@/config'
const HOST = $config.DOMAIN_NAME_SERVICE

// 仓库查询
export const query = data => {
  return $http('GET', `${HOST}/api/v1/warehouses`, { data })
}
