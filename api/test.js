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

//Tablice użytkowników/pokoi
let users = []
let rooms = []

io.on('connection', (socket) => {
    io.emit('updateRooms', rooms)
    console.log('User connected!')
    users.push({ID: socket.id})
    console.log(users)

    //Aktualizacja listy pokoi jeżeli ktoś właśnie utworzył nowy
    socket.on('updateRooms', (room) => {
        rooms.push({name: room.name, description: room.description, uname: room.uname, socket: socket.id})
        console.log(rooms)
        io.emit('updateRooms', rooms)
    })

    socket.on('joinRoom', async(roomToJoin) => {
        //Usuwanie z tablicy z pokojami tego pokoju do którego ktoś dołączył
        rooms = await rooms.filter(room => {
            if(room.socket != roomToJoin.socket){
                return room
            }else{
                io.to(roomToJoin.socket).emit('joinedRoom', roomToJoin.socket)
                io.to(socket.id).emit('joinedRoom', roomToJoin.socket)
            }
        })
        io.emit('updateRooms', rooms)
    })

    //Dołączanie użytkownika do danego pokoju
    socket.on('roomConnect', (roomId) => {
        socket.join(roomId)
    })
    socket.on('newMessage', (chat) => {
        io.to(chat.socket).emit('newMessage', chat.input)
    })

    socket.on('disconnect', async () => {
        //Usuwanie pokoju założonego przez rozłączonego użytkownika
        rooms = rooms.filter(room => {
            if(room.socket != socket.id){
                return room
            }else{
                io.emit('updateRooms', rooms) //Ponowna emitacja zaktualizowanej listy pokoi
            }
        })
        //Usuwanie rozłączonego użytkownika z listy użytkowników
        users = users.filter(user => {
            if(user.ID != socket.id){
                return user
            }
        })
        console.log('User disconnected!')
    })
})