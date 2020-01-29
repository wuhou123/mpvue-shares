import $http from '@/utils/http'
import $config from '@/config'
const HOST = $config.DOMAIN_NAME_ACCOUNT
function json2Form (json) {
  var str = []
  for (var p in json) {
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(json[p]))
  }
  return str.join('&')
}

// 初始化
export const init = data => {
  return $http('GET', `${HOST}/auth/init`, data)
}
// 登录操作
export const login = data => {
  return $http('POST', `${HOST}/auth/gologin`, { data })
}
// 发送验证码
export const sendMesageCode = data => {
  return $http(
    'POST',
    `${HOST}/mobile/sendmesagecode`,
    { data: json2Form(data) },
    true
  )
}
// 验证验证码
export const validCode = data => {
  return $http(
    'POST',
    `${HOST}/mobile/valid_message_code`,
    { data: json2Form(data) },
    true
  )
}
// 修改密码
export const resetPwd = data => {
  return $http(
    'POST',
    `${HOST}/mobile/change_pwd_find`,
    { data: json2Form(data) },
    true
  )
}
