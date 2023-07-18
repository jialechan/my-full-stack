import logger from './log.js'

export const succ = (res, data, msg) => {
  const response = {
    code: 200,
    msg,
    data,
  }
  logger.responseInfo(response)
  res.json(response)
}

export const simpleSucc = (res) => {
  const response = {
    code: 200,
  }
  logger.responseInfo(response)
  res.json(response)
}

export const unkonwError = (res, ...msg) => {
  const response = {
    code: -1,
    msg,
  }
  logger.responseInfo(response)
  res.json(response)
}

export const noToken = (res) => {
  const response = {
    code: -2,
    msg: '验证失败或验证过期',
  }
  logger.responseInfo(response)
  res.json(response)
}

export const loginFail = (res) => {
  const response = {
    code: -3,
    msg: '登录失败，用户名或密码错',
  }
  logger.responseInfo(response)
  res.json(response)
}

export const userDisabled = (res) => {
  const response = {
    code: -4,
    msg: '用户已经被禁用，请联系管理员。',
  }
  logger.responseInfo(response)
  res.json(response)
}
