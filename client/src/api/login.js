import request from './request'

// 登录
export const loginApi = (data) => {
  return request({
    url: '/api/login',
    method: 'post',
    needToken: false,
    data,
  })
}
