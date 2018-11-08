import express from 'express'

import check from './server/auth/check'
import login from './server/auth/login'
import signup from './server/auth/signup'

export let routes = express.Router()

import jwt from 'jsonwebtoken'
import CFGSRV from './config.server'

const isAuth = (req, res, next) => {
  console.log('routes/isAuth', req.cookies, req.headers)
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

// routes.use(`/${STATIC.API_VERSION}/*`, (req, res, next) => {
//     console.log(`routes `, 'req.headers', req.headers, 'req.baseUrl', req.baseUrl)
//     // only json requests are accepted
//     // else back to default home screen (server side render)
//     if (
//         req.headers.accept === 'application/json' ||
//         req.headers.accept === '*/*' ||
//         req.headers['content-type'].indexOf('application/json') > -1 ||
//         req.headers['content-type'].indexOf('multipart/form-data') > -1
//     ) {
//         next()
//     } else {
//         res.redirect('/')
//     }
// })

// routes before sapper will be handled here
routes.get('/checking', isAuth, (req, res) => {
  console.log('checking', req.headers)
  res.json({
    Tutorial: 'Welcome to the Node express JWT Tutorial',
  })
})

routes.get('/users/check', check)
routes.post('/users/login', login)
routes.post('/users/signup', signup)

// default and catchall route for API
// API routes non recognized are denied
// routes.all('/*', (req, res) => {
//   res.status(422).send()
//   console.error('routes API request invalid', req.method, req.params, req.body)
// })
