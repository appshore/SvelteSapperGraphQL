import express from 'express'

import blog from '../blog'
import slug from '../blog/slug'

import check from '../auth/check'
import login from '../auth/login'
import logout from '../auth/logout'
import signup from '../auth/signup'

import jwt from 'jsonwebtoken'
import CFGSRV from '../../config.server'

let routes = express.Router()

const withAuth = (req, res, next) => {
  // console.log('routes/withAuth', req.cookies, req.headers)
  let token = req.cookies.token
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }

  jwt.verify(token, CFGSRV.SECRET, err => {
    if (err) {
      res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    }
    //   res.status(200).send({ auth: true, message: 'Succeed to authenticate token.' })
    next()
  })
}

routes.use('*', (req, res, next) => {
    // console.log('routes ', 'req.headers', req.headers, 'req.baseUrl', req.baseUrl)
    // only json requests are accepted
    // else back to default home screen (server side render)
    if (
        req.headers.accept === '*/*' ||
        // req.headers['content-type'].indexOf('multipart/form-data') > -1 ||
        req.headers.accept === 'application/json' ||
        req.headers['content-type'].indexOf('application/json') > -1
    ) {
        next()
    } else {
        res.redirect('/')
    }
})

// routes before sapper will be handled here
routes.use('/checking', (req, res) => {
  console.log('checking', req.headers)
  res.json({
    route: 'api/checking',
  })
})

routes.get('/blog/:slug', withAuth, slug)
routes.get('/blog', withAuth, blog)

routes.get('/auth/check', check)
routes.post('/auth/login', login)
routes.post('/auth/logout', logout)
routes.post('/auth/signup', signup)

// default and catchall route for API
// API routes non recognized are denied
// routes.all('*', (req, res) => {
//   res.status(422).send()
//   console.error('routes API request invalid', req.method, req.params, req.body)
// })

export default routes
