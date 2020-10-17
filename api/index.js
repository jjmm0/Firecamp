require('./db')
const express = require('express')
const app = express()
// const http = require('http').createServer(app)
// const io = require('socket.io')(http)

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


// io.on('connection', (socket) => {
//     console.log('user connected')
//     // io.emit('welcomeMSG')
//     // socket.on('sendMSG', (emiting) => {
//     //     io.emit('receivemsg', emiting)
//     // })
// })


module.exports = {
    path: '/api',
    handler: app,
}