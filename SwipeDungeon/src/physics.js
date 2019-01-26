import {game} from "./framework"

export function receiveInput(player, swipes){
	//This function is triggered when the player releases a swipe.
	//Take in game, the game state, and swipe, a vector, and move the player in that direction at a fixed speed (player.constants.speed).
	//Return nothing.

	player.state = 1;
	player.jump.currentTarget.x = player.bound.position.x + swipes.x;
	player.jump.currentTarget.y = player.bound.position.y + swipes.y;

}

export function updatePlayerPosition(player){
	if(player.jump.targets.length !== 0){

	}
	if(player.jump.currentTarget.x !== -1 && game.player.jump.currentTarget.y !== -1){
		player.bound.position.x -= (player.bound.position.x - player.jump.currentTarget.x)/3;
		player.bound.position.y -= (player.bound.position.y - player.jump.currentTarget.y)/3;
		if(Math.abs((player.bound.position.x - player.jump.currentTarget.x)/3) < 1){
			player.state = 0;
		}
	}
}

export function spawnEnemy(enemies){
	let types = ["Archer"];
	let currType = types[Math.floor(Math.random()*types.length)];
	if (enemies.length <= game.constants.enemySpawnRate) {
		let enemy = {
			type: currType, 
			bound: {
				position: {x: Math.random() * 500, y: Math.random() * 500},
				size: {x: 25, y: 25}, 
				velocity: 1, 
				health: 2, 
				counter: 0, 
				active: false,
			}
		};
		if (enemy.type === "Burst") {
			enemy.bound.size.x = 50;
			enemy.bound.size.y = 50;
			enemy.bound.health = 3;
		}
		enemies.push(enemy);
	}
	for (let i = 0; i < enemies.length; i++) {
		if(enemies[i].type === "Archer" || enemies[i].type === "Mage") {
			if(enemies[i].bound.counter % 100 === 0){
				enemies[i].bound.counter = 0;
				let enemy = {
					type: "Projectile", 
					bound: {
						kind: enemies[i].type,
						position: {x: enemies[i].bound.position.x, y: enemies[i].bound.position.y},
						size: {x: 10, y: 10}, 
						velocity: 0.75,
						target: {x: game.player.bound.position.x + game.player.bound.size.x / 2,
						 y: game.player.bound.position.y + game.player.bound.size.x / 2},
					}
				};
				enemies.push(enemy);	
			} 		
		}
	}			
}


export function checkCollisions(player, enemies){
	//This function is triggered every frame.
	//First, check if player is jumping (player kills enemies if jumping).
	//If not and player and enemies have collided, player takes damage.
	//Return nothing.

	let playerx = game.player.bound.position.x + 15;
	let playery = game.player.bound.position.y + 10;

	for(let i = 0; i < enemies.length; i++){
		if (Math.abs(enemies[i].bound.position.x - playerx) < player.bound.size.x - 35 && Math.abs(enemies[i].bound.position.y - playery) < player.bound.size.y - 10){
			if(player.state === 0){
				game.player.health--;
				if(enemies[i].type === "Projectile") {enemies.splice(i, 1) };
			}
			else { //jumping (player hurts enemy)
				if (enemies[i].bound.health === 0){
					if(enemies[i].type==="Burst"){
						let currX = enemies[i].bound.position.x;
						let currY = enemies[i].bound.position.y;
						enemies.splice(i, 1);
						for (let j = 0; j < 5; j++) {
							let enemy = {
							type: "Popped", 
							bound: {
								position: {x: currX + Math.random() * 10, y: currY + Math.random() * 10},
								size: {x:20, y:20}, 
								velocity: 2, 
								health: 1, 
							}
						};
						enemies.push(enemy);
						}
	 				} else {
	 					enemies.splice(i, 1);
	 					game.constants.kills+=1;
		 			}
		 		} else if (enemies[i].type === "Ghost" && enemies[i].bound.active === false){
		 			enemies[i].bound.health-=1;	
		 		} else if (enemies[i].type !== "Ghost"){
					enemies[i].bound.health-=1;
	 			}
	 		}
	 	}
	}
}

export function updateEnemies(player, enemies){
	//This function is triggered every frame.
	//There is more freedom here to have fun with the enemy AI.
	//You could just have each enemy move straight towards the player.
	//Return nothing.
	
	for(let i = 0; i < enemies.length; i++){
		let deltaX = enemies[i].bound.position.x - player.bound.position.x;
		let deltaY = enemies[i].bound.position.y - player.bound.position.y;
		if(enemies[i].type !== "Archer" && enemies[i].type !== "Mage" && enemies[i].type !== "Projectile"){
			//Check X
			if(enemies[i].bound.position.x < player.bound.position.x){
				enemies[i].bound.position.x = enemies[i].bound.position.x + enemies[i].bound.velocity;
			}else{
				enemies[i].bound.position.x = enemies[i].bound.position.x - enemies[i].bound.velocity;
			}
			//Check Y
			if(enemies[i].bound.position.y < player.bound.position.y){
				enemies[i].bound.position.y = enemies[i].bound.position.y + enemies[i].bound.velocity;
			}else{
				enemies[i].bound.position.y = enemies[i].bound.position.y - enemies[i].bound.velocity;
			}


			if(enemies[i].type === "Ghost") {
				if(enemies[i].bound.active === true){
					enemies[i].bound.counter += 1;
					if(enemies[i].bound.counter === 75) {
						enemies[i].bound.active = false;
						enemies[i].bound.counter = 0;
					}
				} else {
					enemies[i].bound.counter += 1;
					if(enemies[i].bound.counter === 100) {
						enemies[i].bound.active = true;
						enemies[i].bound.counter = 0;
					}
				}
			} 
		} else if (enemies[i].type === "Projectile"){
			deltaX = enemies[i].bound.position.x - enemies[i].bound.target.x;
			deltaY = enemies[i].bound.position.y - enemies[i].bound.target.y;
			if(Math.abs(deltaX) < enemies[i].bound.size.x && Math.abs(deltaY) < enemies[i].bound.size.y){
				if(enemies[i].bound.kind === "Mage" && enemies[i].bound.size.x < 50 && enemies[i].bound.size.x < 50){
					enemies[i].bound.size.x = enemies[i].bound.size.x + 1;
					enemies[i].bound.size.y = enemies[i].bound.size.y + 1;
				} else {
					enemies.splice(i,1);
				}
			} else {
				if (Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)) !== 0){
					enemies[i].bound.position.x = enemies[i].bound.position.x - 2*(deltaX/Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)))*enemies[i].bound.velocity;
					enemies[i].bound.position.y = enemies[i].bound.position.y - 2*(deltaY/Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)))*enemies[i].bound.velocity;
				}
			}

		} else {
			enemies[i].bound.counter+=1;
			if (Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)) < 250){
				enemies[i].bound.position.x = enemies[i].bound.position.x + 2*(deltaX/Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)))*enemies[i].bound.velocity;
				enemies[i].bound.position.y = enemies[i].bound.position.y + 2*(deltaY/Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)))*enemies[i].bound.velocity;
			} else if (Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)) > 500){
				enemies[i].bound.position.x = enemies[i].bound.position.x - 2*(deltaX/Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)))*enemies[i].bound.velocity;
				enemies[i].bound.position.y = enemies[i].bound.position.y - 2*(deltaY/Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)))*enemies[i].bound.velocity;
			}
		}
	}
}

function spawnParticles(x, y, particleSize, color, amount){
	//
}

export function updateFX(){
	//This function is triggered every frame.
	//Calculate where any FX particles should go.

}