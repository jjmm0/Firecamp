require('./db')
const express = require('express')
const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http)

let rooms = [] // Array with rooms
let openRooms = [] // Array with joinable rooms

io.on('connection', (socket) => {
	console.log('User connected!');

	// Update and emit rooms array if someone already created new one
	socket.on('createRoom', (room) => {
		rooms.push({
			name: room.name,
			description: room.description,
			client: room.uname,
			helperSocket: null,
			clientSocket: null,
			socket: socket.id
		});
		
		openRooms.push({
			name: room.name,
			description: room.description,
			client: room.uname,
			helperSocket: null,
			clientSocket: null,
			socket: socket.id
		});

		io.emit('updateRooms', openRooms);
	})

	socket.on('getRooms', () => {
		io.to(socket.id).emit('updateRooms', openRooms);
	})

	socket.on('joinRoom', async(roomToJoin) => {
		// Deleting selected room from array if someone join
		openRooms = await openRooms.filter(room => {
			if(room.socket != roomToJoin.socket){
				return room;
			}else{
				//Emit data to room creator and room
				io.to(roomToJoin.socket).emit('created', roomToJoin.socket);
				io.to(socket.id).emit('joined', roomToJoin.socket);
			}
		});
		io.emit('updateRooms', openRooms);
	})

	// Joining user to selected room
	socket.on('roomConnect', (data) => {
		console.log(data.roomId)
		console.log(data)
		// Check is helper/client slot in room is available
		io.of('/').in(data.roomId).clients(async (err, clients) => {
			for(let room of rooms){
				if(room.clientSocket != null && room.helperSocket != null)
				{
					console.log('FULL')
				}
				else{
					// Check who is the creator(client) of the room
					for(let room of rooms){
						if(room.socket === socket.id){
							room.clientSocket = socket.id;
							socket.join(data.roomId);
							socket.room = data.roomId
						}else{
							room.helperSocket = socket.id;
							socket.join(data.roomId);
							socket.room = data.roomId
						}
					}
	
				}
				
			}
		})
	})
	socket.on('newMessage', (chat) => {
		//Check to which socket room send new message
		for(let room of rooms){
			if(room.clientSocket == socket.id){
				let message = {
					msg: chat.input,
					nick: room.client,
					helper: false,
				}
				io.to(socket.room).emit('newMessage', message);
			}
			else if(room.helperSocket == socket.id){
				let message = {
					msg: chat.input,
					nick: chat.nick,
					helper: true,
				}
				io.to(socket.room).emit('newMessage', message);
			}
		}
	})
	
	socket.on('notInRoom', async() => {
		for(let room of rooms){
			console.log(`id client: ${room.clientSocket} id helper: ${room.helperSocket} id przychodzace ${socket.id}`)
			if(room.clientSocket === socket.id){
				await io.to(room.socket).emit('userDC')
				socket.disconnect()
			}
			else if(room.helperSocket === socket.id){
				await io.to(room.socket).emit('userDC')
				socket.disconnect()
			}
		}
	})

	socket.on('canJoin', () => {
		if(rooms.length <= 0){
			console.log('xd')
			io.to(socket.id).emit('cantJoin')
		}
		for(let room of rooms){
			if(!socket.room){
				io.to(socket.id).emit('cantJoin')
			}
			else{
				for(let room of rooms){
					if(room.socket != socket.room){
						io.to(socket.id).emit('cantJoin')
					}
				}
			}
		}
	})

	socket.on('disconnect', async() => {
		// Deleting client room on disconnect
		rooms = await rooms.filter(room => {
			if(room.socket != socket.id){
				return room
			}else{
				//Do not return any room
			}
		})
		openRooms = await openRooms.filter(room => {
			if(room.socket != socket.id){
				return room
			}else{
				// Emiting new openRooms array
			}
		})
		if(socket.room){
			io.to(socket.room).emit('userDC')
		}
		io.emit('updateRooms', openRooms)
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