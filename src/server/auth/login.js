import { userModel } from '../../models/user'
import { generateToken, validPassword } from './utils'
import { filterProfile } from '../users/filter'

const login = (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .exec()
    .then(user => {
      user = JSON.parse(JSON.stringify(user))

      if (validPassword(req.body.password, user.password) === false) {
        return res.status(401).json({
          failed: 'Unauthorized Access',
        })
      }

      let token = generateToken({
        email: user.email,
        _id: user._id,
      })

      return res.status(200).json({
        success: 'Welcome back',
        token,
        user: filterProfile(user),
      })
    })
    .catch(error => {
      return res.status(500).json({
        error: error,
      })
    })
}

export default login
