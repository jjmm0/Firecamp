require('./db')
const express = require('express')
const app = express()

//Import routes
const userRoutes = require('./routes/users')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use(userRoutes)

module.exports = {
    path: '/api',
    handler: app,
  }