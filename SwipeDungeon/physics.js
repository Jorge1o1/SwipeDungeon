function receiveInput(){
	//This function is triggered when the player releases a swipe.
	//Take in game, the game state, and swipe, a vector, and move the player in that direction at a fixed speed (player.constants.speed).
	//Return nothing.

	game.player.state = 1;

	console.log(game.touchPoints);

	var touchPoints = keepEveryNth(game.touchPoints, Math.floor(game.touchPoints.length/5));
	
	var splitIndexes = [];
	var splitStart = 0;
	for (var i = 2; i < touchPoints.length; i++) {
		var deltaX = touchPoints[i].x - touchPoints[i-1].x;
		var deltaY = touchPoints[i].y - touchPoints[i-1].y;

		var deltaX_prev = touchPoints[i-1].x - touchPoints[i-2].x;
		var deltaY_prev = touchPoints[i-1].y - touchPoints[i-2].y;

		if(getSign(deltaX) != getSign(deltaX_prev) || getSign(deltaY) != getSign(deltaY_prev)){
			console.log("FRAME: " + i + " DELTAXSign:" + getSign(deltaX) + " DELTAXPrevSign: " + getSign(deltaX_prev) + " DELTAYSign: " + getSign(deltaY) + " DELTAYPrevSign: " + getSign(deltaY_prev));
			splitIndexes.push([splitStart, i]);
			splitStart = i;
		}
	}
	splitIndexes.push([splitStart, game.touchPoints.length]);
	console.log(splitIndexes);
	for(var i = 0; i < splitIndexes.length; i++){
		
	}

	//player.jump.currentTarget.x = player.bound.position.x + swipes.x;
	//player.jump.currentTarget.y = player.bound.position.y + swipes.y;

	game.touchPoints = [];

}

function keepEveryNth(array, n){
	var arr = [];
	for(var i = 0; i < array.length; i++){
		if(i % n == 0) arr.push(array[i]);
	}
	return arr;

}

function getSign(num){
	if(num == 0) return 1;
	return num/Math.abs(num);
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
	var possibleTypes = ["SIMPLE"];
	if (enemies.length <= game.constants.enemySpawnRate) {
		var currType = possibleTypes[Math.floor(Math.random()*possibleTypes.length)];
		var enemy = {type: currType, bound: {position: {x: Math.random() * 500, y: Math.random() * 500}, size: {x:20, y:20}, velocity: Math.random()*2 + 1}};
		enemies.push(enemy);
	}
}

function checkCollisions(player, enemies){
	//This function is triggered every frame.
	//First, check if player is jumping (player kills enemies if jumping).
	//If not and player and enemies have collided, player takes damage.
	//Return nothing.


	for(var i = 0; i < enemies.length; i++){
		for(var j = i+1; j < enemies.length; j++){
			var deltaX = enemies[j].bound.position.x - enemies[i].bound.position.x;
			var deltaY = enemies[j].bound.position.y - enemies[i].bound.position.y;
			if(Math.abs(deltaX) < enemies[i].bound.size.x && Math.abs(deltaY) < enemies[i].bound.size.y){
				//overlapping
				if(Math.abs(deltaX) > Math.abs(deltaY)){
					//nudging left-right
					if(deltaX < 0){ //nudging left
						enemies[j].bound.position.x = enemies[i].bound.position.x - enemies[j].bound.size.x;
					}else{ //nudge right
						enemies[j].bound.position.x = enemies[i].bound.position.x + enemies[j].bound.size.x;
					}
				}else{
					//nudging up-down
					if(deltaY < 0){ //nudging left
						enemies[j].bound.position.y = enemies[i].bound.position.y - enemies[j].bound.size.y;
					}else{ //nudge right
						enemies[j].bound.position.y = enemies[i].bound.position.y + enemies[j].bound.size.y;
					}
				}
			}
		}
	}

	for(var i = 0; i < enemies.length; i++){
	 	if (Math.abs(enemies[i].bound.position.x - game.player.bound.position.x) < enemies[i].bound.size.x && Math.abs(enemies[i].bound.position. y- game.player.bound.position.y) < enemies[i].bound.size.y){
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

	for(var i = 0; i < enemies.length; i++){
		if(enemies[i].type == "SIMPLE"){
			for(var i = 0; i < enemies.length; i++) {
				var deltaX = enemies[i].bound.position.x - player.bound.position.x;
				var deltaY = enemies[i].bound.position.y - player.bound.position.y;
			
				//if(deltaX > 5){
					if(enemies[i].bound.position.x < player.bound.position.x){
							enemies[i].bound.position.x = enemies[i].bound.position.x + enemies[i].bound.velocity;
					}else{
							enemies[i].bound.position.x = enemies[i].bound.position.x - enemies[i].bound.velocity;
					}
				//}
			
				//if(deltaY > 5){
					if(enemies[i].bound.position.y < player.bound.position.y){
							enemies[i].bound.position.y = enemies[i].bound.position.y + enemies[i].bound.velocity;
					}else{
							enemies[i].bound.position.y = enemies[i].bound.position.y - enemies[i].bound.velocity;
					}
				//}
			}
		}else if(enemies[i].type == "GHOST"){
			enemies[i].bound.position.x++;
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
