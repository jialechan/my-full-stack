import request from './request'

// 登出
export const logoutApi = () => {
  return request({
    url: '/api/logout',
    method: 'post',
  })
}
