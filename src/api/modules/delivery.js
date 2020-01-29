import $http from '@/utils/http'
import $config from '@/config'
const HOST = $config.DOMAIN_NAME_SERVICE

export const queryDelivery = data => {
  return $http('GET', `${HOST}/api/v1/quote/queryDelivery`, { data })
}
