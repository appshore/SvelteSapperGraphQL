import { verifyToken } from './utils'

const logout = (req, res) => {
  console.log('logout', req.body)

  let token = req.cookies.token
  if (Boolean(token) === false) {
    return res.status(401).send({ auth: false, message: 'No token provided' })
  }

  if (verifyToken(token) === false) {
    return res.status(401).send({ auth: false, message: 'Invalid token' })
  }

  console.log('logout success')
  return res.status(200).json({
    auth: false,
    message: 'Logged out',
  })
}

export default logout
