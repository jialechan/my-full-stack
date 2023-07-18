import logger from '@/util/log.js'
import mysql from 'mysql2'

let conn

function init() {
  conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'my-full-stack',
  })

  conn.on('error', function (err) {
    logger.dbErr('数据库发生错误: ' + JSON.stringify(err))
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNREFUSED') {
      setTimeout(init, 1000)
    } else {
      throw err
    }
  })

  conn.on('connect', function () {
    logger.connSucc('mysql连接成功')
  })
}

init()

export const db = conn
