import logger from '@/util/log.js'
import redis from 'redis'

// 创建client
const client = redis.createClient({
  socket: {
    host: 'localhost',
    port: '6379',
  },
  legacyMode: true,
})

// 异步连接
async function init() {
  await client.connect()
}
init()

client.on('error', (err) => {
  logger.redisErr('redis发生错误: ' + JSON.stringify(err))
})
client.on('connect', () => {
  logger.connSucc('Redis连接成功')
})

export default client
