import $http from '@/utils/http'
import $config from '@/config'
const HOST = $config.DOMAIN_NAME_SERVICE

// 个人信息
export const info = data => {
  return $http('GET', `${HOST}/api/v1/accounts/info`, {data})
}
// 获取用户角色列表
export const getUserRoleList = ({userId}) => {
  return $http('GET', `${HOST}/api/v1/accounts/${userId}`)
}
// 查询用户下商家列表
export const getUserCustomers = (data) => {
  return $http('GET', `${HOST}/api/v1/home/usercustomers`, {data})
}
