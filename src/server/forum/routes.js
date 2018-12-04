import express from 'express'

import withAuth from '../auth/withAuth'

import {findPosts} from './posts'
import {deletePost, findPost, savePost, updatePost} from './post'

import {findTags} from './tags'
import {deleteTag, findTag, saveTag, updateTag} from './tag'

let routes = express.Router()

routes.delete('/tag/:code', withAuth, deleteTag)
routes.post('/tag/:code', withAuth, updateTag)
routes.post('/tag', withAuth, saveTag)
routes.get('/tag/:code', findTag)
routes.get('/tags', findTags)

routes.delete('/post/:slug', withAuth, deletePost)
routes.post('/post/:slug', withAuth, updatePost)
routes.post('/post', withAuth, savePost)
routes.get('/post/:slug', findPost)
routes.get('/posts', findPosts)

export default routes