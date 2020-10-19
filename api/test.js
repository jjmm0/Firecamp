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


let users = []
let rooms = []

io.on('connection', (socket) => {
    io.emit('updateRooms', rooms)
    console.log('User connected!')
    users.push({ID: socket.id})
    console.log(users)

    socket.on('updateRooms', (room) => {
        rooms.push({name: room.name, description: room.description, uname: room.uname, socket: socket.id})
        console.log(rooms)
        io.emit('updateRooms', rooms)
    })

    socket.on('joinRoom', async(roomToJoin) => {
        rooms = await rooms.filter(room => {
            if(room.socket != roomToJoin.socket){
                console.log('git')
                return room
            }else{
                // console.log(socket.id)
                io.to(roomToJoin.socket).emit('joinedRoom', roomToJoin.socket)
                io.to(socket.id).emit('joinedRoom', roomToJoin.socket)
            }
        })
        io.emit('updateRooms', rooms)
    })

    socket.on('newMessage', (message) => {
        console.log(message)
        console.log(socket.id)
        io.to(socket.id).emit('newMessage', message)
        io.to(message.socket).emit('newMessage', message)
    })

    socket.on('disconnect', async () => {
        // let filteredRooms = await rooms.filter((event) => {
        //     return event.socket == socket.id
        // })
        // rooms = filteredRooms

        rooms = rooms.filter(room => {
            if(room.socket != socket.id){
                return room
            }
        })

        console.log(rooms)
        users = users.filter(user => {
            if(user.ID != socket.id){
                return user
            }
        })

        io.emit('updateRooms', rooms)
        console.log('User disconnected!')
    })
})