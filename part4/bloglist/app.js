const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRoute = require('./controllers/users')
const loginRoute = require('./controllers/login')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(()=> logger.info('connected to mongoDB database'))
  .catch(error => logger.error('error connecting to mongoDB database', error.message))

app.use(cors())

app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.getTokenFrom)
app.use('/api/blogs',  blogsRouter)
app.use('/api/users', usersRoute)
app.use('/api/login', loginRoute)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app