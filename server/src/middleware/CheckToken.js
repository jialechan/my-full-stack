import * as response from '@/util/response.js'
import * as session from '@/session/index.js'

export const checkToken = (req, res, next) => {
  if (req.originalUrl === '/api/login') {
    next()
  } else {
    const token = req.headers['mfs-token']
    if (!token) {
      response.noToken(res)
      return
    }

    session.getSessionByToken(token, function (err, result) {
      if (err) {
        response.unkonwError(res)
        return
      }
      if (!result) {
        response.noToken(res)
        return
      }
      // 保存session到本地上下文变量
      res.locals.session = JSON.parse(result)
      res.locals.token = token
      next()
    })
  }
}
