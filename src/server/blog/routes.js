import express from 'express'

import withAuth from '../auth/withAuth'

import {getBlogs} from './blogs'
import {getBlog, setBlog} from './blog'

let routes = express.Router()

// routes are reserved for authentified users
routes.get('/:slug', withAuth, getBlog)
routes.post('/:slug', withAuth, setBlog)

routes.get('/', withAuth, getBlogs)

export default routes