import { v4 as uuidv4 } from 'uuid'

import * as response from '@/util/response.js'
import * as dao from '../dao/index.js'
import * as session from '../session/index.js'

export function login(req, res) {
  const loginReq = req.body

  dao.CmsUserDAO.findByEmail(loginReq.email, function (err, cmsUser) {
    if (err) {
      response.unkonwError(res, JSON.stringify(err))
      return
    }
    // 找不到用户
    if (!cmsUser) {
      response.loginFail(res)
      return
    }
    // 找到用户, 判断密码是否相同
    if (loginReq.password !== cmsUser.pwd) {
      response.loginFail(res)
      return
    }
    // 判断是否被禁用
    if (!cmsUser.isEnable) {
      response.userDisabled(res)
      return
    }
    // 生成会话
    const token = uuidv4()
    session.setSession(token, {
      userId: cmsUser.id,
      username: cmsUser.username,
    })
    const loginRes = {
      token,
    }
    response.succ(res, loginRes)
  })
}

export function loginInfo(req, res) {
  if (res.locals.session) {
    const loginInfoRes = {
      username: res.locals.session.username,
    }
    response.succ(res, loginInfoRes)
  } else {
    response.noToken(res)
  }
}
