import request from './request'

// 查询系统用户
export const userlist = (data) => {
  return request({
    url: '/api/app/user',
    method: 'post',
    data,
  })
}
