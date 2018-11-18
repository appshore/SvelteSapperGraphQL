import { userModel } from '../../models/user'
import { filterProfile } from './filter'

export const getUsersByIds = async ids => {

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
