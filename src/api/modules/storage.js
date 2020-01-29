// 库存查询api
import $http from '@/utils/http'
import $config from '@/config'
const HOST = $config.DOMAIN_NAME_SERVICE
import store from '../../store/index'

// 库存查询
export const queryTotalStorage = params => {
 return $http('GET', `${HOST}/api/v1/storages/queryTotalStorage`, params)
}

export const queryWarehouseStorage = params => {
 return $http('GET', `${HOST}/api/v1/storages/queryWarehouseStorage`, params)
}
export const queryBatchStorage = params => {
 return $http('GET', `${HOST}/api/v1/storages/queryBatchStorage`, params)
}
// 获取仓库列表
export const warehouse = () => {
 return $http('GET', `${HOST}/api/v1/pubs/queryWarehouseByCustomerId`, {
  data: {
   customerId: store.state.user.customerId
  }
 })
}
