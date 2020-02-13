// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io'); var app = express();
var server = http.Server(app);
var io = socketIO(server); app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static')); //Routing
app.get('/', function(request, response){
  response.sendFile(path.join(__dirname, 'index.html'));
}); // Starts the server.
server.listen(5000, function(){
  console.log('Starting server on port 5000');
});
//Add the WebSocket handlers
//io.on('connection', function(socket) {
//});

var playercount = 0;
var players = {};
var SOCKETS ={};
io.on('connection', function(socket) {
	socket.on('new player', function() {
    	playercount += 1;
		SOCKETS[socket.id] = playercount;
		
		players[playercount] = {
      		ID: socket.id,
			choice: 4,
      		playernum: playercount,
			draw: 0,
			Win: 0
		
    	};
		//var player = players[socket.id] || {};
		io.sockets.emit('message', players[playercount].playernum);
		io.sockets.emit('message', socket.id);
	});

	socket.on('choice', function(data) {
		var player = players[SOCKETS[socket.id]] || {};
		if (data.Rock) {
			player.choice = 0;
		}
		if (data.Paper) {
			player.choice = 1;
		}
		if (data.Scissors) {
			player.choice = 2;
		}
		var ready = true;
		for (var id in players) {
			if(player.choice > 2){
			ready = false;
			}
		}
		if (ready) {			
			var outcome = players[1].choice - players[2].choice;
			switch(outcome){
				case 0: // draw
					players[1].draw += 1;
					players[2].draw += 1;
					break;
				case 1: // Player 1 Wins
					players[1].Win += 1;
					break;
				case -2: // Player 1 Wins
					players[1].Win += 1;
					break;
				case 2: // Player 2 Wins
					players[2].Win += 1;
					break;
				case -1: //Player 2 Wins
					players[2].Win += 1;
					break;
			}
			io.sockets.emit('state', players);
			player[1].choice = 4;
			player[2].choice = 4;
			
		}
	});
});


/* ********************* CODE FROM EXAMPLE ***********************
setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000); 
var players = {};
io.on('connection', function(socket) {
  socket.on('new player', function() {
    players[socket.id] = {
      x: 300,
      y: 300
    };
  });
  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
  });
});setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);*/
