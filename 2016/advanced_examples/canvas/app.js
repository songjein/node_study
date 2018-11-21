"use strict"
const socketio = require('socket.io');
const express = require('express');
const http = require('http');
const ejs = require('ejs');
const fs = require('fs');

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);

server.listen(8888, () => {
	console.log('server running');
});

app.get('/', (req, res) => {
	fs.readFile('lobby.html', (error, data) => {
		res.send(data.toString());	
	});
});

app.get('/canvas/:room', (req, res) => {
	fs.readFile('canvas.html', 'utf8', (error, data) => {
		res.send(ejs.render(data, {
			room: req.params.room	
		}));	
	});
});

app.get('/room', (req, res) => {
	let rooms = Object.keys(io.sockets.adapter.rooms).filter(function(item){
		return item.indexOf('/') < 0;	
	});
	res.send(rooms);
});

const io = socketio.listen(server);
io.sockets.on('connection', (socket) => {
	let roomId = "";	

	socket.on('join', (data) => {
		socket.join(data);	
		roomId = data;
	});

	socket.on('draw', (data) => {
		io.sockets.in(roomId).emit('line', data);	
	});

	socket.on('create_room', (data) => {
		io.sockets.emit('create_room', data.toString());	
	});
});
