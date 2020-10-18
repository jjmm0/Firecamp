const express = require('express')
const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http)

const port = 3002
const IP = "localhost"

http.listen(port, IP, (err) => {
    if(err){
        console.log(err)
    }
    console.log("socket")
})


const users = []
const rooms = [{name: "XD", description: "desc", uname: "JANUSZ"}]

io.on('connection', (socket) => {
    console.log('User connected!')
    users.push({ID: socket.id})
    console.log(users)

    socket.on('newRoom', (room) => {
        io.emit('newRoom', room)
    })

    socket.on('disconnect', (socket) => {
        users.splice({ID: socket.id})
        console.log(users)
        console.log('User disconnected!')
    })
})