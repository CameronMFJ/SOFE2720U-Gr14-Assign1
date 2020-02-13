var socket = io();
socket.on('message', function(data) {
  console.log(data);
});
socket.emit('new player');
var choice = { 
	Rock: false,
	Paper: false,
	Scissors: false,
	made: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      choice.Rock = true;
	  break;
    case 68: // D
      choice.Scissors = true;
      break;
    case 83: // S
      choice.Paper = true;
      break;
  }
  choice.made = true;
  socket.emit('choice', choice);
  });
  socket.on('state', function(players) {
	// display message of who won
  	// update label for player 1 wins with player[1].Win
	// update label for player 1 draws with players[1].draw
	// update label for player 2 wins with player[2].Win
	// update label for player 2 draws with players[2].draw
	// delay for like 2 seconds
	// display "please pick your weapon" message
	
  
});








/* var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'green';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});1 */
