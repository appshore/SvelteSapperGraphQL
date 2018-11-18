import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import CFGSRV from '../../config.server'

export function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(4), null)
}

export function validPassword(clear, hashed) {
  return bcrypt.compareSync(clear, hashed)
}

export function generateToken(data) {
  // console.log('generateToken', data)
  // return jwt.sign(data, CFGSRV.SECRET)
  return jwt.sign(data, CFGSRV.SECRET, { expiresIn: CFGSRV.TOKEN_TIMEOUT })
}

export function verifyToken(token, timeout = false) {
  let decoded = false
  try {
    decoded = jwt.verify(token, CFGSRV.SECRET)

    if (timeout && Math.round(Date.now() / 1000) - decoded.iat > timeout) {
      return false
    }
    // console.log('verifyToken decoded', decoded)
  } catch (err) {
    return false
  }
  return decoded
}

export function withAuth(req, res, next) {
  // console.log('routes/withAuth', req.cookies, req.headers)
  let token = req.cookies.token
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }

  jwt.verify(token, CFGSRV.SECRET, err => {
    if (err) {
      res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    }
    //   res.status(200).send({ auth: true, message: 'Succeed to authenticate token.' })
    next()
  })
}