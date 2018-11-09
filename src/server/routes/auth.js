import express from 'express'

import check from '../auth/check'
import login from '../auth/login'
import logout from '../auth/logout'
import signup from '../auth/signup'

let routes = express.Router()

routes.get('/check', check)
routes.post('/login', login)
routes.post('/logout', logout)
routes.post('/signup', signup)

export default routes