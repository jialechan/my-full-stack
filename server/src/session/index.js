import redis from '@/config/redis.js'
import logger from '@/util/log.js'

/*
 * 用途(REDISKEY)：保存token到session的映射关系
 * 结构：key <-> value
 * 例子：sesison:token:%uuid <-> '%json'
 */
function tokenKey(token) {
  return 'sesison:token:' + token
}
/*
 * 用途(REDISKEY)：保存userId到token的映射关系
 * 结构：key <-> value
 * 例子：sesison:userId:%uuid <-> '%uuid'
 */
function userIdKey(userId) {
  return 'sesison:userId:' + userId
}

// 保存会话
export const setSession = function (token, session) {
  // 根据token保存会话
  redis.set(tokenKey(token), JSON.stringify(session))
  redis.expire(tokenKey(token), 1800)
  // 根据session查询token，主要用户管理员禁用用户时踢用户的需求
  redis.set(userIdKey(session.userId), token)
  redis.expire(userIdKey(session.userId), 1800)
}

// 刷新会话
export const reflashSession = function (token, userId) {
  // 根据token保存会话
  redis.expire(tokenKey(token), 1800)
  // 根据session查询token，主要用户管理员禁用用户时踢用户的需求
  redis.expire(userIdKey(userId), 1800)
}

// 根据token获取token
export const getSessionByToken = function (token, callback) {
  redis.get(tokenKey(token), (err, result) => {
    logger.redisResLog(err, result)
    callback(err, result)
  })
}

// 根据token清除session
export const cleanSessionByToken = function (token) {
  getSessionByToken(token, (err, result) => {
    if (err) {
      logger.error('cleanSessionByToken出错: ' + token + ' ' + err)
      return
    }
    const session = JSON.parse(result)
    redis.del(userIdKey(session.userId))
    redis.del(tokenKey(token))
  })
}

// 根据userId清除session，通常是踢用户的时候用到
export const cleanSessionByUserId = function (userId) {
  redis.get(userIdKey(userId), (err, result) => {
    if (err) {
      logger.error('cleanSessionByUserId: ' + userId + ' ' + err)
      return
    }
    const token = result
    redis.del(tokenKey(token))
    redis.del(userIdKey(userId))
  })
}
