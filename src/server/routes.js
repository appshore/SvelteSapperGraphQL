import express from 'express'

import authRoutes from './auth/routes'
import blogRoutes from './blog/routes'

let routes = express.Router()

// make sure only it is json content-type requests
routes.use('*', (req, res, next) => {
    // console.log('routes ', 'req.headers', req.headers, 'req.baseUrl', req.baseUrl)
    // only json requests are accepted
    // else back to default home screen (server side render)
    if (
        // req.headers.accept === '*/*' ||
        // req.headers['content-type'].indexOf('multipart/form-data') > -1 ||
        req.headers.accept === 'application/json' ||
        req.headers['content-type'].indexOf('application/json') > -1
    ) {
        next()
    } else {
        res.redirect('/')
    }
})

routes.use('/auth', authRoutes)
routes.use('/blog', blogRoutes)

// default and catchall route for API
// API routes non recognized are denied
routes.all('*', (req, res) => {
  res.status(422).send()
  console.error('routes API request invalid', req.method, req.params, req.body)
})

export default routes
