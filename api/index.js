// Import modules, database etc.
require('./db');
const fs = require('fs');
const express = require('express');
const app = express();
const hostname = require('os').hostname();
const isDedicatedServer = hostname === 't2n.t2n';
const path = require('path');

const httpsOptions = isDedicatedServer ? {
	key: fs.readFileSync(path.resolve(__dirname, '../ssl/privkey.pem')),
	cert: fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem')),
	ca: fs.readFileSync(path.resolve(__dirname, '../ssl/chain.pem')),
    requestCert: false,
    rejectUnauthorized: false
} : {};

const http = require('http').createServer(app);
const https = require('https').createServer(httpsOptions, app);
const io = require('socket.io')();
io.attach(http);
io.attach(https);

// Import user model
const User = require('./models/user');

let rooms = []; // Array with rooms
let openRooms = []; // Array with joinable rooms

// On socket connection
io.on('connection', (socket) => {
		console.log('User connected!');

		// Update and emit rooms array if someone already created new one
		socket.on('createRoom', (roomData) => {
		// Check is this socket are not already a room creator
		if(rooms.length <= 0){
			rooms.push({
				name: roomData.name,
				description: roomData.description,
				client: roomData.uname,
				helperSocket: null,
				helperID: null,
				clientSocket: socket.id,
				socket: socket.id
			});
			
			openRooms.push({
				name: roomData.name,
				description: roomData.description,
				client: roomData.uname,
				helperSocket: null,
				helperID: null,
				clientSocket: socket.id,
				socket: socket.id
			});
			io.to(socket.id).emit('created', socket.id);

			// Emit new openRooms array
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
						clientSocket: socket.id,
						socket: socket.id
					});
					
					openRooms.push({
						name: roomData.name,
						description: roomData.description,
						client: roomData.uname,
						helperSocket: null,
						helperID: null,
						clientSocket: socket.id,
						socket: socket.id
					});
					io.to(socket.id).emit('created', socket.id);

					// Emit new openRooms array
					io.emit('updateRooms', openRooms);
					break;
				}
			}
		}
	})

	// Get openRooms array
	socket.on('getRooms', () => {
		io.to(socket.id).emit('updateRooms', openRooms);
	})

	// Join to selected room
	socket.on('joinRoom', async(roomToJoin) => {
		// Delete selected room from array if someone join
		openRooms = await openRooms.filter(room => {
			if(room.socket != roomToJoin.socket){
				return room;
			}else{
				//Emit data to helper
				io.to(socket.id).emit('joined', roomToJoin.socket);
			}
		});
		// Emit new openRooms array
		io.emit('updateRooms', openRooms);
	})
 
	// Join user to selected room
	socket.on('roomConnect', (data) => {
		// Check is helper/client slot in room is available
		io.of('/').in(data.roomId).clients(async (err, clients) => {
			if(clients.length > 3){
				// Do nothing
			}
			else if(clients.length < 3){
				// Check who is the creator(client) of the room
				for(let room of rooms){
					if(room.socket == data.roomId){
						if(room.socket === socket.id && !socket.room){
							socket.join(data.roomId);
							socket.liked = false
							socket.room = data.roomId
							break;
						}
						else if(room.helperSocket != true && !socket.room){
							room.helperSocket = socket.id;
							room.helperID = data.helperID
							socket.join(data.roomId);
							socket.liked = true
							socket.room = data.roomId
							break;
						}
					}
				}
			}
		})
	})

	// Send room data to user which CAN join to the room
	socket.on('takeRoomData', async(roomData) => {
		if(rooms.length <= 0){
			io.to(socket.id).emit('cantJoin');
		}
		else{
			if(!socket.room){
				io.to(socket.id).emit('cantJoin');
			}
			else if(socket.room == roomData.roomID){
				for(let room of rooms){
					if(room.clientSocket === socket.id && room.helperSocket && !roomData.helper){
						io.to(socket.id).emit('helperData', room.helperID);
						break;
					}
					else if(room.helperSocket === socket.id && roomData.helper){
						io.to(socket.id).emit('helperData', room.helperID);
						io.to(room.clientSocket).emit('helperJoined');
						break;
					}
				}
			}
			else{
				io.to(socket.id).emit('cantJoin');
			}
		}
		
	})

	// Handle new message
	socket.on('newMessage', (chat) => {
		// Check to which socket send a new message
		for(let room of rooms){
			if(room.clientSocket == socket.id && room.helperSocket){
				let message = {
					msg: chat.input,
					nick: room.client,
					helper: false,
				};
				io.to(socket.room).emit('newMessage', message);
				break;
			}
			else if(room.helperSocket == socket.id && room.clientSocket){
				let message = {
					msg: chat.input,
					nick: chat.nick,
					helper: true,
				};
				io.to(socket.room).emit('newMessage', message);
				break;
			}
		}
	})

	// Handle like
	socket.on('likeHelper', (helperID) => {
		// Check is client already liked someone to prevent like spam
		if(!socket.liked){
			User.findOne({_id: helperID}, (err, found) => {
				if(found){
					User.findOneAndUpdate({_id: helperID}, {Likes: found.Likes + 1}, {new: true}, (err, result) => {
						if(result){
							socket.liked = true;
						}
						else if(err){
							console.log(err);
						}
					});
				}
				else if(err){
					console.log(err);
				}
			});
		}
	})

	// If user are not in his room - disconnect
	socket.on('notInRoom', async() => {
		for(let room of rooms){
			if(room.clientSocket === socket.id){
				await io.to(socket.room).emit('userDC');
				socket.room = null
				socket.disconnect();
				break;
			}
			else if(room.helperSocket === socket.id){
				await io.to(socket.room).emit('userDC');
				socket.room = null
				socket.disconnect();
				break;
			}
		}
	})

	// Socket disconnect
	socket.on('disconnect', async() => {
		// Delete client room on disconnect
		rooms = await rooms.filter(room => {
			if(room.socket != socket.id){
				return room;
			}else{
				//Do not return any room
			}
		})
		openRooms = await openRooms.filter(room => {
			if(room.socket != socket.id){
				return room;
			}else{
				//Do not return any room
			}
		})

		if(socket.room){
			// If user was connected to the room
			io.to(socket.room).emit('userDC');
		}

		console.log('User disconnected!');
		// Emit new openRooms array
		io.emit('updateRooms', openRooms);
	})
})



// Import routes
const userRoutes = require('./routes/users');
const verifyRoutes = require('./routes/verify');
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Routes
app.use(userRoutes);
app.use(verifyRoutes);

// Run socket.io external server
http.on('error', () => {}).listen(3001);
https.on('error', () => {}).listen(3002);

module.exports = {
	path: '/api',
	handler: app,
}