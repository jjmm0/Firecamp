require('./db')
const express = require('express')
const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http)

let rooms = [] // Array with rooms
let openRooms = [] // Array with joinable rooms

io.on('connection', (socket) => {
    console.log('User connected!');
    // io.emit('updateRooms', openRooms);

    // Update and emit rooms array if someone already created new one
    socket.on('createRoom', (room) => {
        rooms.push({
            name: room.name,
            description: room.description,
            client: room.uname,
            helperID: null,
            clientID: null,
            socket: socket.id
        });
        
        openRooms.push({   
            name: room.name,
            description: room.description,
            client: room.uname,
            helperID: null,
            clientID: null,
            socket: socket.id
        });

        io.emit('updateRooms', openRooms);
    })

    socket.on('getRooms', () => {
        io.to(socket.id).emit('updateRooms', openRooms);
    })

    socket.on('joinRoom', async(roomToJoin) => {
        // Usuwanie z tablicy z pokojami tego pokoju do którego ktoś dołączył
        openRooms = await openRooms.filter(room => {
            if(room.socket != roomToJoin.socket){
                return room;
            }else{
                io.to(roomToJoin.socket).emit('created', roomToJoin.socket);
                io.to(socket.id).emit('joined', roomToJoin.socket);
            }
        });
        console.log(openRooms)
        io.emit('updateRooms', openRooms);
    })

    // Joining user to selected room
    socket.on('roomConnect', (roomId) => {
        io.of('/').in(roomId).clients(async (err, clients) => {
            for(let room of rooms){
                if(room.clientID != null && room.helperID != null)
                {
                    console.log('FULL')
                }
                else{
                    for(let room of rooms){
                        if(room.socket === socket.id){
                            room.clientID = socket.id;
                            socket.join(roomId);
                        }else{
                            room.helperID = socket.id;
                            socket.join(roomId);
                        }
                    }
    
                }
                
            }
        })
    })
    socket.on('newMessage', (chat) => {
        for(let room of rooms){
            if(room.clientID == socket.id){
                let message = {
                    msg: chat.input,
                    nick: room.client
                }
                io.to(room.socket).emit('newMessage', message);
            }
            else if(room.helperID == socket.id){
                let message = {
                    msg: chat.input,
                    nick: chat.nick
                }
                io.to(room.socket).emit('newMessage', message);
            }
        }
    })

    socket.on('disconnect', async() => {
        // Usuwanie pokoju założonego przez rozłączonego użytkownika
        rooms = await rooms.filter(room => {
            if(room.socket != socket.id){
                return room
            }else{

            }
        })

        openRooms = await openRooms.filter(room => {
            if(room.socket != socket.id){
                return room
            }else{
                io.emit('updateRooms', openRooms)
            }
        })
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