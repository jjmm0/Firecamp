require('./db')
const express = require('express')
const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http)

let rooms = []

io.on('connection', (socket) => {
    console.log('User connected!')
    io.emit('updateRooms', rooms)

    // Aktualizacja tablicy z pokojami jeżeli ktoś właśnie utworzył nowy
    socket.on('createRoom', (room) => {
        rooms.push({name: room.name, description: room.description, uname: room.uname, socket: socket.id})
        console.log(rooms)
        io.emit('updateRooms', rooms)
    })

    socket.on('getRooms', () => {
        io.to(socket.id).emit('updateRooms', rooms)
    })

    socket.on('joinRoom', async(roomToJoin) => {
        // Usuwanie z tablicy z pokojami tego pokoju do którego ktoś dołączył
        rooms = await rooms.filter(room => {
            if(room.socket != roomToJoin.socket){
                return room
            }else{
                io.to(roomToJoin.socket).emit('created', roomToJoin.socket)
                io.to(socket.id).emit('created', roomToJoin.socket)
            }
        })
        io.emit('updateRooms', rooms)
    })

    // Dołączanie użytkownika do danego pokoju
    socket.on('roomConnect', (roomId) => {
        socket.join(roomId)
    })
    socket.on('newMessage', (chat) => {
        io.to(chat.socket).emit('newMessage', chat)
    })

    socket.on('disconnect', async () => {
        // Usuwanie pokoju założonego przez rozłączonego użytkownika
        rooms = rooms.filter(room => {
            if(room.socket != socket.id){
                return room
            }else{
                io.emit('updateRooms', rooms) // Ponowna emitacja zaktualizowanej listy pokoi
            }
        })
        // // Usuwanie rozłączonego użytkownika z listy użytkowników
        // users = users.filter(user => {
        //     if(user.ID != socket.id){
        //         return user
        //     }
        // })
        console.log('User disconnected!')
    })
})


// Import routes
const userRoutes = require('./routes/users')
const roomsRoutes = require('./routes/rooms')
const verifyRoutes = require('./routes/verify')
// const rankingRoutes = require('./routes/ranking')
 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use(userRoutes)
app.use(roomsRoutes)
app.use(verifyRoutes)
// app.use(rankingRoutes)

// Run socket.io external server
http.on('error', () => {}).listen(3001);

module.exports = {
    path: '/api',
    handler: app,
}