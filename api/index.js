require('./db')
const express = require('express')
const app = express()

//Import routes
const userRoutes = require('./routes/users')
const roomsRoutes = require('./routes/rooms')
const verifyRoutes = require('./routes/verify')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use(userRoutes)
app.use(roomsRoutes)
app.use(verifyRoutes)

module.exports = {
    path: '/api',
    handler: app,
}