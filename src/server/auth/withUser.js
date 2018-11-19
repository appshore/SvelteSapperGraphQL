import { userModel } from '../../models/user'
import { verifyToken } from './utils'
import { filterProfile } from '../users/filter'

// express middleware to inject user's profile in request
const withUser = async (req, res, next) => {
  if ( req.cookies.token ) {
    let decoded = verifyToken(req.cookies.token)

    if (decoded) {
      // user is auth we retrieve profile
      let user = await userModel
        .findOne({ _id: decoded._id })
        .exec()
        .then(user => JSON.parse(JSON.stringify(user)))

      req.user = filterProfile(user)
    }
  }

  next()
}

export default withUser
