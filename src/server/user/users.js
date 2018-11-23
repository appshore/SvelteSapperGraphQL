import { userModel } from '../../models/user'
import { filterProfile } from './profile'

export const findUsersByIds = async ids => {

  // make an array of unique ids
  ids = [...new Set(ids.map(f => f.toString()))]

  return await userModel
    .find({ _id: { $in: ids } })
    .exec()
    .then(users => {
      users = JSON.parse(JSON.stringify(users))
      // users profile are filtered out
      return users.map( user => filterProfile(user))
    })
    .catch(error => {
      return {
        error
      }
    })
}

export const findUsers = (req, res) => {
  userModel
    .find()
    .sort({username:1})
    .exec()
    .then(users => {
      users = JSON.parse(JSON.stringify(users))
      // add user info to each blog then filter it to remove unwanted fields
      return res.status(200).json({
        users: users.map( user => filterProfile(user))
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error,
      })
    })
}