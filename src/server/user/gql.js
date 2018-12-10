import formatRelative from 'date-fns/formatRelative'
import { enGB } from 'date-fns/locale'

import { userModel } from '../../models/user'

// Only the info that we want to send to the client
export const filterUser = user => {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    timestamp: formatRelative(user.createdAt, new Date(), { locale: enGB })
  }
}

export const filterUserInList = user => {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    timestamp: formatRelative(user.createdAt, new Date(), { locale: enGB })
  }
}

export const findUser = async (cond = {}) => {
  return await userModel
    .findOne(cond)
    .exec()
    // .then(user => JSON.parse(JSON.stringify(user)))
    .then(user => filterUser(user))
    .catch(error => error)
}

export const findUsers = async (cond = {}, sort = { createdAt: -1 }) => {
  return await userModel
    .find(cond)
    .sort(sort)
    .exec()
    // .then(users => JSON.parse(JSON.stringify(users)))
    .then(users => users.map(user => filterUserInList(user)))
    .catch(error => error)
}
