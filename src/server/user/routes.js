import express from 'express'

import withAuth from '../auth/withAuth'

import {findUsers} from './users'
// import {deleteUser, findUser, saveUser, updateUser} from './user'
import {signup} from './user'
import {updatePrefs} from './prefs'
import {updateProfile} from './profile'

let routes = express.Router()

routes.post('/prefs', withAuth, updatePrefs)
routes.post('/profile', withAuth, updateProfile)

// routes.delete('/:username', withAuth, deleteUser)

// routes.post('/:username', withAuth, updateUser)
// routes.post('/', withAuth, saveUser)

// routes.get('/:username', findUser)

routes.post('/signup', signup)

routes.get('/', findUsers)

export default routes