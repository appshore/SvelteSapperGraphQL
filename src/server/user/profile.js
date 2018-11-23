import { userModel } from '../../models/user'
import { hashPassword } from '../auth/utils'
import { findUserById } from './user'

export const extendProfile = user => {
  user.fullName = `${user.firstName} ${user.lastName}`
  return user
}

// Only the info that we want to send to the client
export const filterProfile = user => {
  return JSON.parse(
    JSON.stringify({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      role: user.role
    })
  )
}

export const updateProfile = (req, res) => {
  let dataSet = JSON.parse(
    JSON.stringify({
      username: req.body.username || undefined,
      email: req.body.email || undefined,
      password: req.body.password ? hashPassword(req.body.password) : undefined,
      updatedAt: new Date(),
      updatedBy: req.user._id
    })
  )

  userModel
    .updateOne({ _id: req.user._id }, { $set: dataSet })
    .then(async () => {
      return res.status(200).json({
        user: filterProfile(await findUserById(req.user._id))
      })
    })
    .catch(error => {
      return res.status(500).json({
        error
      })
    })
}
