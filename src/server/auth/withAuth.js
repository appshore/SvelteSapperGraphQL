import { verifyToken } from './utils'

const withAuth = (req, res, next) => {
  // console.log('routes/withAuth', req.cookies, req.headers)
  let token = req.cookies.token
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }

  if (verifyToken(token) === false ) {
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
  }
  
  // res.status(200).send({ auth: true, message: 'Succeed to authenticate token.' })
  next()
}

export default withAuth