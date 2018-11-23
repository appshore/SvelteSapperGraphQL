import { verifyToken } from './utils'
import { filterProfile } from '../user/profile'
import { findUserById } from '../user/user'

// express middleware to inject user's profile in request
const withUser = async (req, res, next) => {
  if ( req.cookies.token ) {
    let decoded = verifyToken(req.cookies.token)

    if (decoded) {
      // user is auth we retrieve profile
      req.user = filterProfile(await findUserById( decoded._id))
    }
  }

  next()
}

export default withUser
