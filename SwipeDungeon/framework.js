var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

document.getElementById("myCanvas").addEventListener("mousedown", function(event) {handleInput(0, 0, event);});
document.getElementById("myCanvas").addEventListener("touchmove", function(event) {handleInput(1, 0, event);});
document.getElementById("myCanvas").addEventListener("mouseup", function(event) {handleInput(0, 1, event);});
document.getElementById("myCanvas").addEventListener("touchend", function(event) {handleInput(0, 1, event);});

var FRAMEWORK_CONSTANTS = {
	FPS: 60,
	running: true,
};


//FOR REFERENCE:
var game = {
	tick: 0, //do not modify
	constants:{
		enemySpawnRate: 200,
		thresh: 1200,
		growth_rate: 0.2,
		friction: 0.998
	},
	player: {
		health: 100,
		constants: {
			speed: 2,
			health: 100
		},
		jump:{
			targets:[],
			currentTarget:{
				x: -1,
				y: -1,
			}
		},
		bound:{
			position:{
				x: 100,
				y: 100
			},
			size:{
				x:40,
				y:40
			}
		},
		state: 0 //0 is normal, 1 is jumping
	},
	enemies: [],
	mouse: {
		start:{
			x: -1,
			y: -1
		}
	},
	particles: []
};

function handlePhysics(){
	game.tick++;
	if(game.tick % game.constants.enemySpawnRate == 0) spawnEnemy(game.enemies);
	updateEnemies(game.player, game.enemies);
	updatePlayerPosition(game.player);
	checkCollisions(game.player, game.enemies);
	updateFX();
}

function handleDrawing(){
	ctx.clearRect(0, 0, c.width, c.height);
	drawAssets();
	drawFX();
	drawUI();
}

//DONT MODIFY:
function handleInput(type, action, e){ //function optimized for portability; runs on computer (0) and mobile (1)
	if(type == 0){
		//handle computer input
		if(action == 0){
			//handle mousemove
			if(game.mouse.start.x == -1 && game.mouse.start.y == -1){
				game.mouse.start = {x: e.clientX, y: e.clientY};
			}
		}else{
			//handle mouseup
			var swipe = {x: (e.clientX - game.mouse.start.x), y: (e.clientY - game.mouse.start.y)};
			game.mouse.start = {x: -1, y: -1};
			receiveInput(game.player, swipe);
		}
	}else{
		//handle mobile input - NOTE: THIS HAS NOT BEEN UNIT TESTED YET
		if(action == 0){
			//handle touchmove
			if(game.mouse.start.x == -1 && game.mouse.start.y == -1){
				game.mouse.start = {x: e.touches[0].pageX, y: e.touches[0].pageY};
			}

		}else{
			//handle touchup
			var swipe = {x: (e.touches[0].pageX - game.mouse.start.x), y: (e.touches[0].pageY - game.mouse.start.y)};
			game.mouse.start = {x: -1, y: -1};
			receiveInput(game.player, swipe);
		}
	}
}

var myInt = window.setInterval(function(){if(FRAMEWORK_CONSTANTS.running){handlePhysics(); handleDrawing();}}, (1000/FRAMEWORK_CONSTANTS.FPS));





