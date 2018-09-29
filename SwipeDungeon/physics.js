function receiveInput(player, swipes){
	//This function is triggered when the player releases a swipe.
	//Take in game, the game state, and swipe, a vector, and move the player in that direction at a fixed speed (player.constants.speed).
	//Return nothing.

	player.state = 1;
	player.jump.currentTarget.x = player.bound.position.x + swipes.x;
	player.jump.currentTarget.y = player.bound.position.y + swipes.y;
	player.state = 0;
}

function updatePlayerPosition(player){
	if(player.jump.targets.length != 0){

	}
	if(player.jump.currentTarget.x != -1 && game.player.jump.currentTarget.y != -1){
		player.bound.position.x -= parseInt((player.bound.position.x - player.jump.currentTarget.x)/3);
		player.bound.position.y -= (player.bound.position.y - player.jump.currentTarget.y)/3;
	}
}

function spawnEnemy(enemies){
	if (enemies.length <= 4) {
	var enemy = { bound: { position:{ x: parseInt(Math.random() * 500), y: Math.random() * 500}, size:{ x:20, y:20},
	 velocity: parseInt(Math.random()*2) + 1}};
	enemies.unshift(enemy);
	}
}

function checkCollisions(player, enemies){
	//This function is triggered every frame.
	//First, check if player is jumping (player kills enemies if jumping).
	//If not and player and enemies have collided, player takes damage.
	//Return nothing.

	// if(player.state == 0){ //not jumping (enemy hurts player)
	// 	for(var i = 0; i < enemies.length; i++){
	// 		if (game.player.bound.position.x - enemies[i].bound.position.x < 5 &&
	// 			game.player.bound.position.y - enemies[i].bound.position.y < 5)
	// 			game.player.bound.constants.health--;
	// 			console.log(game.player.bound.constants.health);
	// 	}
	// }else{ //jumping (player hurts enemy)
	// 	if (game.player.bound.position.x - enemies[i].bound.position.x < 5 &&
	// 		game.player.bound.position.y - enemies[i].bound.position.y < 5)
	// 			enemies[i].splice();
	// }


}

function updateEnemies(player, enemies){
	//This function is triggered every frame.
	//There is more freedom here to have fun with the enemy AI.
	//You could just have each enemy move straight towards the player.
	//Return nothing.
	for(var i = 0; i < enemies.length; i++) {
		if(enemies[i].bound.position.x != player.bound.position.x){
			if(enemies[i].bound.position.x < player.bound.position.x){
				if(checkEnemyCollision(enemies[i], enemies, 1)){
				} else {
					enemies[i].bound.position.x = enemies[i].bound.position.x + enemies[i].bound.velocity;
				}
			}
			if(enemies[i].bound.position.x > player.bound.position.x){
				if(checkEnemyCollision(enemies[i], enemies, -1)){
				} else {
					enemies[i].bound.position.x = enemies[i].bound.position.x - enemies[i].bound.velocity;
				}
			}
		}

		if(enemies[i].bound.position.y != player.bound.position.y){
			if(enemies[i].bound.position.y < player.bound.position.y){
				if(checkEnemyCollision(enemies[i], enemies, 1)){
				} else {
					enemies[i].bound.position.y = enemies[i].bound.position.y + enemies[i].bound.velocity;
				}
			}
			if(enemies[i].bound.position.y > player.bound.position.y){
				if(checkEnemyCollision(enemies[i], enemies, -1)){
				} else {
					enemies[i].bound.position.y = enemies[i].bound.position.y - enemies[i].bound.velocity;
				}
			}
		}
	}
}

function checkEnemyCollision(enemy, enemies, vel){
	for(var j = 0; j < enemies.length; j++) {
			if(enemy == enemies[j]);
			else if (((enemy.bound.position.x + (enemy.bound.size.x/2) < enemies[j].bound.position.x + enemies[j].bound.size.x/2)
				&& (enemy.bound.position.x + (enemy.bound.size.x/2) > enemies[j].bound.position.x - (enemies[j].bound.size.x/2))
				&& (enemy.bound.position.y + (enemy.bound.size.y/2) < enemies[j].bound.position.y + (enemies[j].bound.size.y/2))
				&& (enemy.bound.position.y + (enemy.bound.size.y/2) > enemies[j].bound.position.y - (enemies[j].bound.size.y/2))  && vel > 0)

				|| ((enemy.bound.position.x - (enemy.bound.size.x/2) < enemies[j].bound.position.x + (enemies[j].bound.size.x/2))
				&& (enemy.bound.position.x - (enemy.bound.size.x/2) > enemies[j].bound.position.x - (enemies[j].bound.size.x/2))
				&& (enemy.bound.position.y - (enemy.bound.size.y/2) < enemies[j].bound.position.y + (enemies[j].bound.size.y/2))
				&& (enemy.bound.position.y - (enemy.bound.size.y/2) > enemies[j].bound.position.y - (enemies[j].bound.size.y/2))  && vel > 0)) {
				return true;
		}
	}
	return false;
}

function spawnParticles(x, y, particleSize, color, amount){
	//
}

function updateFX(){
	//This function is triggered every frame.
	//Calculate where any FX particles should go.

}
