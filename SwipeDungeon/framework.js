var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

document.getElementById("myCanvas").addEventListener("mousedown", function(event) {game.touchDown = true;});
document.getElementById("myCanvas").addEventListener("mouseup", function(event) {game.touchDown = false; handleInput(0, 1, event);});

document.getElementById("myCanvas").addEventListener("touchstart", function(event) {game.touchDown = true;});
document.getElementById("myCanvas").addEventListener("touchend", function(event) {game.touchDown = false; handleInput(1, 1, event);});

document.getElementById("myCanvas").addEventListener("mousemove", function(event) {handleInput(0, 0, event);});
document.getElementById("myCanvas").addEventListener("touchmove", function(event) {handleInput(1, 0, event);});


var FRAMEWORK_CONSTANTS = {
	FPS: 60,
	running: true,
};


//FOR REFERENCE:
var game = {
	tick: 0, //do not modify
	touchDown: false,
	touchPoints:[],
	constants:{
		enemySpawnRate: 60,
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
				x: 0,
				y: 0
			},
			size:{
				x:20,
				y:20
			}
		},
		state: 0 //0 is normal, 1 is jumping
	},
	enemies: [],
	projectiles: [],
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
			if(game.touchDown){
				game.touchPoints.push({x: e.clientX, y: e.clientY});
			}
		}else{
			//handle mouseup
			console.log("COMPUTER MOUSEUP");
			receiveInput();
		}
	}else{
		//handle mobile input - NOTE: THIS HAS NOT BEEN UNIT TESTED YET
		if(action == 0){
			//handle mousemove
			if(game.touchDown) game.touchPoints.push({x: e.touches[0].pageX, y: e.touches[0].pageY});
		}else{
			//handle mouseup
			console.log("IOS MOUSEUP");
			receiveInput();
		}
	}
}

window.setInterval(function(){if(FRAMEWORK_CONSTANTS.running){handlePhysics(); handleDrawing();}}, (1000/FRAMEWORK_CONSTANTS.FPS));





