import { db } from '@/config/mysql.js'
import logger from '@/util/log.js'

export const findByEmail = (email, callback) => {
  const sql = `SELECT * from cms_user where email = ?`
  const param = [email]
  logger.dbReqLog(sql, param)
  db.query(sql, param, (err, result) => {
    logger.dbResLog(err, result)
    if (err) {
      callback(err)
    }
    callback(null, result?.[0])
  })
}

export const findByEmailAndPassword = (email, password, callback) => {
  const sql = `SELECT * from cms_user where email = ? and pwd = ?`
  const param = [email, password]
  logger.dbReqLog(sql, param)
  db.query(sql, param, (err, result) => {
    logger.dbResLog(err, result)
    if (err) {
      callback(err)
    }
    callback(null, result?.[0])
  })
}
