// require('module-alias/register')
import express from 'express'
import cors from 'cors'
import compress from 'compression'
import morgan from 'morgan'

import * as controller from '@/controller/index.js'
import { logReqeustBody } from '@/middleware/LogRequestBody.js'
import { checkToken } from '@/middleware/CheckToken.js'

const app = express()

// 配置中间件
app.use(morgan('common')) // 打印访问日志中间件
app.use(express.json()) // 使用解析json body中间件
app.use(compress()) // 压缩
app.use(cors({ credentials: true, origin: true })) // 使用cors中间件(TODO: cors配置在正式环境应该更加"严格")
app.use(logReqeustBody) // 打印请求body
app.use(checkToken) // 检查token

// 配置路由
app.post('/api/login', controller.Login.login)
app.post('/api/logout', controller.Logout.logout)
app.get('/api/loginInfo', controller.Login.loginInfo)
app.post('/api/app/user', controller.App.userList)

const port = 8003
app.listen(port, () => {
  return console.log(`Express is listening on port ${port}`)
})
