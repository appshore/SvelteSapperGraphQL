import mongoose from 'mongoose'

import { userModel } from '../../models/user'

import { generateToken, hashPassword } from '../auth/utils'

import { filterProfile } from './profile'

export const findUserById = async _id => {
  return await userModel
    .findOne({ _id })
    .exec()
    .then(user => JSON.parse(JSON.stringify(user)))
    .catch(error => error)
}

export const findUserByEmail = async email => {
  return await userModel
    .findOne({ email })
    .exec()
    .then(user => JSON.parse(JSON.stringify(user)))
    .catch(error => error)
}

export const findUser = (req, res) => {
  userModel
    .findOne({ _id: req.user._id })
    .exec()
    .then(user => {
      return res.status(200).json({
        user: JSON.parse(JSON.stringify(user))
      })
    })
    .catch(error => {
      return res.status(500).json({
        error: error
      })
    })
}

export const signup = async (req, res) => {
  let user = new userModel({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    password: hashPassword(req.body.password)
  })

  try {
    user = await user
      .save()
      .then(usr => filterProfile(JSON.parse(JSON.stringify(usr))))
      .catch(error => error)

    let token = generateToken({
      email: user.email,
      _id: user._id
    })

    return res.status(200).json({
      success: 'New user',
      token,
      user
    })
  } catch (error) {
    return res.status(500).json({
      error
    })
  }
}
