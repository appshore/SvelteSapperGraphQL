import express from 'express'

import blog from '../blog'
import slug from '../blog/slug'

import withAuth from './withAuth'

let routes = express.Router()

// routes are reserved for authentified users
routes.get('/:slug', withAuth, slug)
routes.get('/', withAuth, blog)

export default routes