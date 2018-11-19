import { generateToken } from './utils'
import { filterProfile } from '../users/filter'


// called by client to check if user is auth and retrieve profile
const check = (req, res) => {
  if (Boolean(req.user) === false) {
    return res.status(401).json({ 
      auth: false, 
      message: 'Not authentified' 
    })
  }

  let token = generateToken({
    email: req.user.email,
    _id: req.user._id
  })

  return res.status(200).json({
    token,
    user: filterProfile(req.user)
  })
}

export default check
