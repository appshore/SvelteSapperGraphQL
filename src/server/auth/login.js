import { generateToken, validPassword } from './utils'
import { findUserByEmail } from '../user/user'
import { filterProfile } from '../user/profile'

const login = async (req, res) => {
  try {
    let user = await findUserByEmail(req.body.email)

    if (validPassword(req.body.password, user.password) === false) {
      return res.status(401).json({
        failed: 'Unauthorized Access'
      })
    }

    let token = generateToken({
      email: user.email,
      _id: user._id
    })

    return res.status(200).json({
      success: 'Welcome back',
      token,
      user: filterProfile(user)
    })
  } catch (error) {
    return res.status(500).json({
      error
    })
  }
}

export default login
