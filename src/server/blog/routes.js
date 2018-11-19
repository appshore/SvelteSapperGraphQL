import express from 'express'

import withAuth from '../auth/withAuth'

import {findBlogs} from './blogs'
import {deleteBlog, findBlog, saveBlog, updateBlog} from './blog'

let routes = express.Router()

routes.delete('/:slug', withAuth, deleteBlog)

routes.post('/:slug', withAuth, updateBlog)
routes.post('/', withAuth, saveBlog)

routes.get('/:slug', findBlog)
routes.get('/', findBlogs)

export default routes