function receiveInput(player, swipes){
	//This function is triggered when the player releases a swipe.
	//Take in game, the game state, and swipe, a vector, and move the player in that direction at a fixed speed (player.constants.speed).
	//Return nothing.

	player.state = 1;
	player.jump.currentTarget.x = player.bound.position.x + swipes.x;
	player.jump.currentTarget.y = player.bound.position.y + swipes.y;

}

function updatePlayerPosition(player){
	if(player.jump.targets.length != 0){

	}
	if(player.jump.currentTarget.x != -1 && game.player.jump.currentTarget.y != -1){
		player.bound.position.x -= (player.bound.position.x - player.jump.currentTarget.x)/3;
		player.bound.position.y -= (player.bound.position.y - player.jump.currentTarget.y)/3;
		if(Math.abs((player.bound.position.x - player.jump.currentTarget.x)/3) < 1){
			player.state = 0;
		}
	}
}

function spawnEnemy(enemies){
	if (enemies.length <= game.constants.enemySpawnRate) {
		var enemy = {bound: {position: {x: Math.random() * 500, y: Math.random() * 500}, size: {x:20, y:20}, velocity: Math.random()*2 + 1}};
		enemies.push(enemy);
	}
}

function checkCollisions(player, enemies){
	//This function is triggered every frame.
	//First, check if player is jumping (player kills enemies if jumping).
	//If not and player and enemies have collided, player takes damage.
	//Return nothing.

	 for(var i = 0; i < enemies.length; i++){
	 	if (Math.abs(enemies[i].bound.position.x - game.player.bound.position.x) < enemies[i].bound.size.x && Math.abs(enemies[i].bound.position. y- game.player.bound.position.y) < enemies[i].bound.size.y){
		 	console.log(player.state);
		 	if(player.state == 0){ //not jumping (enemy hurts player)		
		 		game.player.health--;
		 	}else{ //jumping (player hurts enemy)
		 		enemies.splice(i, 1);
		 	}
	 	}
	 	
	 }
}

function updateEnemies(player, enemies){
	//This function is triggered every frame.
	//There is more freedom here to have fun with the enemy AI.
	//You could just have each enemy move straight towards the player.
	//Return nothing.
	for(var i = 0; i < enemies.length; i++) {
		if(enemies[i].bound.position.x < player.bound.position.x){
				enemies[i].bound.position.x = enemies[i].bound.position.x + enemies[i].bound.velocity;
		}else{
				enemies[i].bound.position.x = enemies[i].bound.position.x - enemies[i].bound.velocity;
		}
	
		if(enemies[i].bound.position.y < player.bound.position.y){
				enemies[i].bound.position.y = enemies[i].bound.position.y + enemies[i].bound.velocity;
		}else{
				enemies[i].bound.position.y = enemies[i].bound.position.y - enemies[i].bound.velocity;
		}
	}
}

function spawnParticles(x, y, particleSize, color, amount){
	//
}

function updateFX(){
	//This function is triggered every frame.
	//Calculate where any FX particles should go.

}
