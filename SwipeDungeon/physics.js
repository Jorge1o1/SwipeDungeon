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
	var types = ["Ghost","Burst", "Archer", "Mage"];
	var currType = types[Math.floor(Math.random()*types.length)];
	if (enemies.length <= game.constants.enemySpawnRate) {
		var enemy = {
			type: currType, 
			bound: {
				position: {x: Math.random() * 500, y: Math.random() * 500},
				size: {x: 25, y: 25}, 
				velocity: Math.random()*2 + 1, 
				health: 1, 
				hidden: {counter: 0, active: false}
			}
		};
		if (enemy.type == "Burst") {
			enemy.bound.size.x = 50;
			enemy.bound.size.y = 50;
			enemy.bound.health = 3;
		}
		enemies.push(enemy);
	}
	//Spawn Projectile
	if(game.tick % 100 == 0){
		for (var i = 0; i < enemies.length; i++) {
			if(enemies[i].type == "Archer" || enemies[i].type == "Mage") {
				var enemy = {
					type: "Projectile", 
					bound: {
						position: {x: enemies[i].bound.position.x - 50, y: enemies[i].bound.position.y - 50},
						size: {x: 5, y: 5}, 
						velocity: 1,
						target: {x: game.player.bound.position.x, y: game.player.bound.position.y},
						ang: Math.atan(game.player.bound.position.x - enemies[i].bound.position.x, game.player.bound.position.y - enemies[i].bound.position.y),
						health: 1
					}
				};	
				enemies.push(enemy);		
			}
		}			
	}
}

function checkCollisions(player, enemies){
	//This function is triggered every frame.
	//First, check if player is jumping (player kills enemies if jumping).
	//If not and player and enemies have collided, player takes damage.
	//Return nothing.

	for(var i = 0; i < enemies.length; i++){
		for(var j = i+1; j < enemies.length; j++){
			if(enemies[i].type == "Ghost"){
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
}

	for(var i = 0; i < enemies.length; i++){
	 	if (Math.abs(enemies[i].bound.position.x - game.player.bound.position.x) < enemies[i].bound.size.x && Math.abs(enemies[i].bound.position. y- game.player.bound.position.y) < enemies[i].bound.size.y){
		 	if(player.state == 0){ //not jumping (enemy hurts player)		
		 		game.player.health--;
		 	}else{ //jumping (player hurts enemy)
		 		if (enemies[i].bound.health == 0){
			 		if(enemies[i].type=="Burst"){
						var currX = enemies[i].bound.position.x;
						var currY = enemies[i].bound.position.y;

						enemies.splice(i, 1);
						for (var i = 0; i < 5; i++) {
							var enemy = {
							type: "Popped", 
							bound: {
								position: {x: currX + Math.random() * 10, y: currY + Math.random() * 10},
								size: {x:20, y:20}, 
								velocity: 4, 
								health: 1, 
								hidden: {counter: 0, active: false}
							}
						};
						enemies.push(enemy);
						}
		 			} else {
		 				enemies.splice(i, 1);
		 			}
		 		} else if (enemies[i].type == "Ghost" && enemies[i].bound.hidden.active == false){
		 			enemies[i].bound.health-=1;	
		 		} else if (enemies[i].type != "Ghost"){
		 			enemies[i].bound.health-=1;
		 		}
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
		if(enemies[i].type != "Archer" && enemies[i].type != "Mage" && enemies[i].type != "Projectile"){
				var deltaX = enemies[i].bound.position.x - player.bound.position.x;
				var deltaY = enemies[i].bound.position.y - player.bound.position.y;

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

					if(enemies[i].type == "Ghost") {
						if(enemies[i].bound.hidden.active == true){
							enemies[i].bound.hidden.counter += 1;
							if(enemies[i].bound.hidden.counter == 75) {
								enemies[i].bound.hidden.active = false;
								enemies[i].bound.hidden.counter = 0;
							}
						} else {

						enemies[i].bound.hidden.counter += 1;
						if(enemies[i].bound.hidden.counter == 100) {
							enemies[i].bound.hidden.active = true;
							enemies[i].bound.hidden.counter = 0;
						}
					}
				} 
			
		} else if (enemies[i].type == "Projectile"){
			if(enemies[i].bound.target.x != enemies[i].bound.position.x && enemies[i].bound.target.y != enemies[i].bound.position.y){
			var deltaX = enemies[i].bound.position.x - enemies[i].bound.target.x;
			var deltaY = enemies[i].bound.position.y - enemies[i].bound.target.y;
			if (Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)) != 0){
				enemies[i].bound.position.x = enemies[i].bound.position.x - 2*(deltaX/Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)))*enemies[i].bound.velocity;
				enemies[i].bound.position.y = enemies[i].bound.position.y - 2*(deltaY/Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)))*enemies[i].bound.velocity;
			}
			}

		} else {
			var deltaX = enemies[i].bound.position.x - player.bound.position.x;
			var deltaY = enemies[i].bound.position.y - player.bound.position.y;
			if (Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)) < 250){
				enemies[i].bound.position.x = enemies[i].bound.position.x + 2*(deltaX/Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)))*enemies[i].bound.velocity;
				enemies[i].bound.position.y = enemies[i].bound.position.y + 2*(deltaY/Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)))*enemies[i].bound.velocity;
			}
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