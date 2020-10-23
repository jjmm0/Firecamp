require('./db')
const express = require('express')
const app = express()

const http = require('http').createServer(app)
// const io = require('socket.io')(http)
const https = require('https').createServer(app);
const io = require('socket.io')();
io.attach('http')
io.attach('https')

let rooms = [] // Array with rooms
let openRooms = [] // Array with joinable rooms

io.on('connection', (socket) => {
	console.log('User connected!');

	// Update and emit rooms array if someone already created new one
	socket.on('createRoom', (roomData) => {
		if(rooms.length <= 0){
			rooms.push({
				name: roomData.name,
				description: roomData.description,
				client: roomData.uname,
				helperSocket: null,
				helperID: null,
				clientSocket: null,
				socket: socket.id
			});
			
			openRooms.push({
				name: roomData.name,
				description: roomData.description,
				client: roomData.uname,
				helperSocket: null,
				helperID: null,
				clientSocket: null,
				socket: socket.id
			});
			io.emit('updateRooms', openRooms);
		}
		else{
			for(let room of rooms){
				if(socket.room){
					break;
				}
				else if(socket.id == room.socket){
					break;
				}
				else if(socket.id != room.socket)
				{
					rooms.push({
						name: roomData.name,
						description: roomData.description,
						client: roomData.uname,
						helperSocket: null,
						helperID: null,
						clientSocket: null,
						socket: socket.id
					});
					
					openRooms.push({
						name: roomData.name,
						description: roomData.description,
						client: roomData.uname,
						helperSocket: null,
						helperID: null,
						clientSocket: null,
						socket: socket.id
					});
					io.emit('updateRooms', openRooms);
					break;
				}
			}
		}
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
		console.log(data)
		// Check is helper/client slot in room is available
		io.of('/').in(data.roomId).clients(async (err, clients) => {
			// Check who is the creator(client) of the room
			if(clients.length > 3){
				//Do nothing
			}
			else if(clients.length < 3){
				for(let room of rooms){
					if(room.socket == data.roomId){
						if(room.socket === socket.id && !socket.room){
							room.clientSocket = socket.id;
							socket.join(data.roomId);
							socket.room = data.roomId
							break;
						}else if(room.helperSocket != true && !socket.room){
							room.helperSocket = socket.id;
							room.helperID = data.helperID
							socket.join(data.roomId);
							socket.room = data.roomId
							break;
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
			// console.log(`id client: ${room.clientSocket} id helper: ${room.helperSocket} id przychodzace ${socket.id}`)
			if(room.clientSocket === socket.id){
				await io.to(socket.room).emit('userDC')
				// socket.disconnect()
				break;
			}
			else if(room.helperSocket === socket.id){
				await io.to(socket.room).emit('userDC')
				// socket.disconnect()
				break;
			}
		}
	})

	socket.on('takeRoomData', () => {
		if(rooms.length <= 0){
			io.to(socket.id).emit('cantJoin')
		}
		else{
			if(!socket.room){
				io.to(socket.id).emit('cantJoin')
			}
			else{
				for(let room of rooms){
					if(room.socket === socket.id){
						io.to(socket.id).emit('helperData', room.helperID)
						break;
					}
					else if(room.socket === socket.room){
						io.to(socket.id).emit('helperData', room.helperID)
						break;
					}
				}
			}
		}
		
	})

	socket.on('disconnect', async() => {
		console.log(rooms)
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
https.on('error', () => {}).listen(3002);

module.exports = {
	path: '/api',
	handler: app,
}