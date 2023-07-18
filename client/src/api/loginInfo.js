import request from './request'

// 获取登录信息
export const loginInfoApi = () => {
  return request({
    url: '/api/loginInfo',
    method: 'get',
  })
}
