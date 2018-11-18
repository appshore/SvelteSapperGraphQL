import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import CFGSRV from '../../config.server'
import { userModel } from '../../models/user'

import { filterProfile } from '../users/filter'

export const hashPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(4), null)
}

export const validPassword = (clear, hashed) => {
  return bcrypt.compareSync(clear, hashed)
}

export const generateToken = data => {
  // console.log('generateToken', data)
  // return jwt.sign(data, CFGSRV.SECRET)
  return jwt.sign(data, CFGSRV.SECRET, { expiresIn: CFGSRV.TOKEN_TIMEOUT })
}

export const verifyToken = (token, timeout = false) => {
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
