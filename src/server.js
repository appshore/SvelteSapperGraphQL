import http from 'http'
import express from 'express'
import bluebird from 'bluebird'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import * as sapper from '../__sapper__/server'

import AppStore from './store'

import CFG from './config'
import CFGSRV from './config.server'

import routes from './server/routes'

const { PORT, NODE_ENV } = process.env

const app = express()

app.disable('x-powered-by')

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  bodyParser.json(),
  cookieParser(),
)

if (NODE_ENV === 'production') {
  app.use(compression())
  app.use(cors())
  app.set('trust proxy', 1) // trust first proxy
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

// static folder
app.use(express.static('static'))

// set promise lib for Mongo and Mongoose
let mongoOptions = {
  promiseLibrary: bluebird,
  useNewUrlParser: true,
}
mongoose.Promise = bluebird
mongoose.connect(CFGSRV.DB_URL, mongoOptions)

// api routes
app.use(`/${CFG.API_VERSION}`, routes)

// sapper framework with its own routes
app.use(
  sapper.middleware({
    store: () =>
      new AppStore({
        CFG,
      }),
  }),
)

// set http server
let server = http.createServer(app)

server.listen(PORT, err => {
  if (err) {
    console.log('error', err)
  }
})
