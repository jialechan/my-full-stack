import * as response from '../util/response.js'
import * as session from '../session/index.js'

function logout(req, res) {
  session.cleanSessionByToken(res.locals.token)
  response.simpleSucc(res)
}

export { logout }
