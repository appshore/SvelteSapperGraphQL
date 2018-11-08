import { userModel } from '../../models/user'
import { generateToken, validPassword } from './utils'
import { filterProfile } from '../users/filter'

const login = (req, res) => {
  console.log('login', req.body)
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

      console.log('login success', user, token, filterProfile(user))
      return res.status(200).json({
        success: 'Welcome to the JWT Auth',
        token,
        user: filterProfile(user),
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error,
      })
    })
}

export default login
