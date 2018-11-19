import mongoose from 'mongoose'

import { userModel } from '../../models/user'
import { generateToken, hashPassword } from './utils'
import { filterProfile } from '../users/filter'

const signup = (req, res) => {
  let user = new userModel({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    password: hashPassword(req.body.password),
  })

  user
    .save()
    .then(result => {
      result = JSON.parse(JSON.stringify(result))

      let token = generateToken({
        email: user.email,
        _id: user._id,
      })

      return res.status(200).json({
        success: 'New user',
        token,
        user: filterProfile(result),
      })
    })
    .catch(error => {
      return res.status(500).json({
        error,
      })
    })
}

export default signup
