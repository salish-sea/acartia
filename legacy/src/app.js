import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import expressApp from './services/express'
import express from 'express'
import path from 'path'
import api from './api'
import { dbService, getAll, getItem, post } from './services/orbitdb'
import { EventEmitter } from 'events'

// Prevent max listener warnings upon running the application
EventEmitter.defaultMaxListeners = 30

const app = expressApp(apiRoot, api)
const server = http.createServer(app)

// Using the routes from API to handle endpoints
app.use('/', api)

if (mongo.uri) {
  mongoose.connect(mongo.uri)
}
mongoose.Promise = Promise

dbService()

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
