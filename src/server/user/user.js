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
    .then(user => JSON.parse(JSON.stringify(user)))
    .then(user => res.status(200).json({user}))
    .catch(error => res.status(500).json({error}))
}

export const signup = async (req, res) => {
  let userMdl = new userModel({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    password: hashPassword(req.body.password),
    createdAt: Date()
  })

  try {
    let user = await userMdl
      .save()
      .then(user => JSON.parse(JSON.stringify(user)))
      .then(user => filterProfile(user))
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
