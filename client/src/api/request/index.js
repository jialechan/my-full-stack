import axios from 'axios'
import config from './config'
import util from '@/util'

export default function request(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create(config)
    // request 请求拦截器
    instance.interceptors.request.use(
      (config) => {
        // 默认是需要带上token
        const { needToken = true } = options
        if (needToken) {
          let token = localStorage.getItem('mfs-token')
          // 发送请求时携带 token
          if (token) {
            config.headers['mfs-token'] = token
          } else {
            // 没有token就直接跳转到登录页面
            util.gotoLoginPage()
          }
        }
        return config
      },
      (error) => {
        // 请求发生错误时
        console.log('request:', error)
        // 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexof('timeout') !== -1) {
          ElMessage({ message: '请求超时', type: 'error', showClose: true })
          return Promise.reject(error)
        }
      }
    )
    // response 响应拦截器
    instance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = '请求地址出错: $(err.response.config.url}'
              break
            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              break
            case 501:
              err.message = '服务未实现'
              break
            case 502:
              err.message = '网关错误'
              break
            case 503:
              err.message = '服务不可用'
              break
            case 504:
              err.message = '网关超时'
              break
            case 505:
              err.message = 'HTTP 版本不受支持'
              break
            default:
              err.message = '未知错误码: ' + err.response.status
              break
          }
        }

        if (err.message) {
          ElMessage({ message: err.message, type: 'error', showClose: true })
        }
        return Promise.reject(err)
      }
    )
    // 发起请求处理
    /**
     * response 统一格式
     * {
     *      code: 200,
     *      msg: '消息[String]',
     *      data: '返回数据[Any]'
     * }
     * code 说明:
     *      200 成功
     *      -1 失败，可能网络不通，可能后台服务异常或其他异常
     *      -2 没有回话，可能是token过期或token错或根本没有token，跳转登录
     */
    instance(options)
      .then((res) => {
        if (res.code === 200) {
          resolve(res)
        } else {
          // 没有回话
          if (res.code === -2) {
            // 没有token就直接跳转到登录页面
            localStorage.removeItem('mfs-token')
            util.gotoLoginPage()
          } else {
            // 其他失败都到这里
            ElMessage({
              message: res.msg || '操作失败',
              type: 'error',
              showClose: true,
            })
            reject(res)
          }
        }
      })
      .catch((error) => {
        ElMessage({
          message: '网络错误，请稍后再试。',
          type: 'error',
          showClose: true,
        })
        reject(error)
      })
  })
}
