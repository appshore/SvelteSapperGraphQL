import mongoose from 'mongoose'

import { userModel } from '../../models/user'
import { generateToken, hashPassword } from './utils'
import { filterProfile } from '../users/filter'

const signup = (req, res) => {
  console.log('signup', req.body)

  let user = new userModel({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hashPassword(req.body.password),
  })

  user
    .save()
    .then(result => {

      let token = generateToken({
        email: user.email,
        _id: user._id,
      })

      console.log('signup', result, user)

      res.status(200).json({
        success: 'New user has been created',
        token,
        user: filterProfile(user),
      })
    })
    .catch(error => {
      res.status(500).json({
        error,
      })
    })
}

export default signup
