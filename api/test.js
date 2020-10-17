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


io.on('connection', (socket) => {
    console.log('User connected!')
    users.push({ID: socket.id})



    socket.on('method1', (x) => {
        console.log(users)
        console.log('ok')
        console.log(x)
        io.emit('method1', x)
    })

    socket.on('newRoom', (room) => {
        console.log(room)
        io.emit('newRoom', room)
    })
    
})