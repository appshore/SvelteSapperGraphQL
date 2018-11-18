import express from 'express'

import check from './check'
import login from './login'
import logout from './logout'
import signup from './signup'

let routes = express.Router()

routes.get('/check', check)
routes.post('/login', login)
routes.post('/logout', logout)
routes.post('/signup', signup)

export default routes