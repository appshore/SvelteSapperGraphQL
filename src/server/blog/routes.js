import express from 'express'

import withAuth from '../auth/withAuth'

import {findPosts} from './posts'
import {deletePost, findPost, savePost, updatePost} from './post'

let routes = express.Router()

routes.delete('/:slug', withAuth, deletePost)

routes.post('/:slug', withAuth, updatePost)
routes.post('/', withAuth, savePost)

routes.get('/:slug', findPost)
routes.get('/', findPosts)

export default routes