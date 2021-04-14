const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require ('./utils/middleware')



mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(express.json())

app.use(middleware.tokenExtractor)


app.use('/api/blogs',blogsRouter)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app