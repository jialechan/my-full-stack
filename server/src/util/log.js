import winston from 'winston'
import chalk from 'chalk'

const transports = []
if (process.env.NODE_ENV === 'production') {
  transports.push(
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'combined.log',
      level: 'verbose',
    })
  )
} else {
  transports.push(new winston.transports.Console())
}

const logger = winston.createLogger({
  level: 'debug',
  format: process.env.NODE_ENV !== 'production' ? winston.format.simple() : winston.format.json(),
  transports,
})

logger.dbReqLog = function (...msg) {
  logger.debug('请求数据库: ' + chalk.blue(msg))
}
logger.dbResLog = function (err, result) {
  logger.debug('数据库返回: ' + chalk.blue(`err = ${err}, result = ${JSON.stringify(result)}`))
}
const orange = chalk.hex('#FFA500')
logger.redisResLog = function (err, result) {
  logger.debug('redis返回: ' + orange(`err = ${err}, result = ${JSON.stringify(result)}`))
}
logger.responseInfo = function (msg) {
  logger.info('API准备返回: ' + chalk.yellow(JSON.stringify(msg)))
}
logger.connSucc = function (msg) {
  logger.info(chalk.green(msg))
}
logger.dbErr = logger.redisErr = function (msg) {
  logger.error(chalk.red(msg))
}

export default logger
