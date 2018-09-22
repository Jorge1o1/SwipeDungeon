function receiveInput(player, swipes){
	//This function is triggered when the player releases a swipe.
	//Take in game, the game state, and swipe, a vector, and move the player in that direction at a fixed speed (player.constants.speed).
	//Return nothing.

	player.state = 1;
	player.jump.targets = swipes;
}

function updatePlayerPosition(player){
	if(player.jump.targets.length != 0){

	}
	if(player.jump.target.x != -1 && player.jump.target.y != -1){
		player.bound.position.x -= (player.bound.position.x - player.jump.target.x)/3;
		player.bound.position.y -= (player.bound.position.y - player.jump.target.y)/3;
	}
}

function spawnEnemy(enemies){

}

function checkCollisions(player, enemies){
	//This function is triggered every frame.
	//First, check if player is jumping (player kills enemies if jumping). 
	//If not and player and enemies have collided, player takes damage.
	//Return nothing.


	if(player.state == 0){ //not jumping (enemy hurts player)
		for(var i = 0; i < enemies.length; i++){
			//if touching player
				//player gets hurt --
		}
	}else{ //jumping (player hurts enemy)
			//if touching player
				//enemy dies (.splice)
	}


}

function updateEnemies(player, enemies){
	//This function is triggered every frame.
	//There is more freedom here to have fun with the enemy AI.
	//You could just have each enemy move straight towards the player.
	//Return nothing.
}

function spawnParticles(x, y, particleSize, color, amount){
	//
}

function updateFX(){
	//This function is triggered every frame.
	//Calculate where any FX particles should go.

}