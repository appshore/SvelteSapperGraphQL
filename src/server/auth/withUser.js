import { userModel } from '../../models/user'
import { verifyToken } from './utils'
import { filterProfile } from '../users/filter'

// express middleware to inject user's profile in request
const withUser = async (req, res, next) => {
  // console.log('routes/withUser', req.cookies, req.headers)
  if (Boolean(req.cookies.token) === false) {
    next()
  }

  let decoded = verifyToken(req.cookies.token)
  if (decoded === false) {
    next()
  }

  let user = await userModel
    .findOne({ _id: decoded._id })
    .exec()
    .then(user => JSON.parse(JSON.stringify(user)))

  req.user = filterProfile(user)
  next()
}

export default withUser