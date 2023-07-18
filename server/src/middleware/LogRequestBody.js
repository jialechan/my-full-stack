import logger from '@/util/log.js'
import chalk from 'chalk'

export const logReqeustBody = (req, res, next) => {
  let curlLog = 'curl ' + chalk.yellow(`http://${req.headers.host}${req.path}`) + ' '

  for (let index = 0; index < req.rawHeaders.length; index = index + 2) {
    curlLog += `-H '${req.rawHeaders[index]}: ${req.rawHeaders[index + 1]}' `
  }

  if (req.body && JSON.stringify(req.body) !== '{}') {
    curlLog += chalk.yellow(`-d '${JSON.stringify(req.body)}'`)
  }

  logger.info('收到请求: ' + curlLog)

  next()
}
