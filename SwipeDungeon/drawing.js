function drawAssets(){
	//This function is triggered every frame.
	//Use the "ctx" object and the "ctx.drawImage" or "ctx.fillRect" functions to draw the game.
	ctx.fillStyle = "black";
	//ctx.fillRect(game.player.bound.position.x, game.player.bound.position.y, game.player.bound.size.x, game.player.bound.size.y);
	var player = new Image();
	player.src = 'images/player_idle_front.png';
	
	var archer = new Image();
	archer.src = 'images/archer.png';
		
	var player = new Image();
	giant.src = 'images/giant.png';
		
	var player = new Image();
	mage.src = 'images/mage.png';

	var cameraPos = {x: game.player.bound.position.x-500, y: game.player.bound.position.y-250};
	ctx.fillRect(game.player.bound.position.x + 15 - cameraPos.x, game.player.bound.position.y+12.5 -cameraPos.y, game.player.bound.size.x - 30, game.player.bound.size.y - 15);

	if(game.player.state == 1){
		if(game.player.bound.position.x - game.player.jump.currentTarget.x > 0){
			player.src = 'player_battle_left.png';
		}else{
			player.src = 'player_battle_right.png';
		}
	}
	ctx.drawImage(player, game.player.bound.position.x-cameraPos.x, game.player.bound.position.y-cameraPos.y, game.player.bound.size.x, game.player.bound.size.y);
	
	for (var i = game.enemies.length - 1; i >= 0; i--) {
		if (game.enemies[i].type == "Ghost") {
			if(game.enemies[i].bound.active == false) {
				ctx.fillStyle = "orange";
			} else if (game.enemies[i].bound.active == true){
				ctx.fillStyle = "grey";
			}
			ctx.fillRect(game.enemies[i].bound.position.x-cameraPos.x, game.enemies[i].bound.position.y-cameraPos.y, game.enemies[i].bound.size.x, game.enemies[i].bound.size.y);
		} else if (game.enemies[i].type == "Burst") {
			ctx.drawImage(giant, game.enemies[i].bound.position.x-cameraPos.x, game.enemies[i].bound.position.y-cameraPos.y, game.enemies[i].bound.size.x, game.enemies[i].bound.size.y);
		} else if (game.enemies[i].type == "Mage") {
			ctx.drawImage(mage, game.enemies[i].bound.position.x-cameraPos.x, game.enemies[i].bound.position.y-cameraPos.y, game.enemies[i].bound.size.x, game.enemies[i].bound.size.y);
		} else if (game.enemies[i].type == "Archer") {
			ctx.drawImage(archer, game.enemies[i].bound.position.x-cameraPos.x, game.enemies[i].bound.position.y-cameraPos.y, game.enemies[i].bound.size.x, game.enemies[i].bound.size.y);
		} else { 
			// Make misc red (atm. Popped, projectiles)
			ctx.fillStyle = "red";
			ctx.fillRect(game.enemies[i].bound.position.x-cameraPos.x, game.enemies[i].bound.position.y-cameraPos.y, game.enemies[i].bound.size.x, game.enemies[i].bound.size.y);
		}
	}

}

function drawFX(){
	//This function is triggered every frame.
	//Draw all FX particles.
	if(game.player.bound.position.x == 0 && game.player.bound.position.y == 0){
		for ( var i = 0; i< 1124; i++){
		//In this draw particles in the position of the enemy killed
		}
	}
}

function drawUI(){
	//This function is triggered every frame.
	//For now, draw Coins, Health.
	/*ctx.fillStyle = "yellow";
	for (var i = Math.random() * 6 + 1; i > 0; i--) {
	 	ctx.filledArc(Math.random(),Math.random(),50,0,2*Math.PI);
	}*/
	ctx.fillStyle = "red";
    ctx.fillRect(200, 10, game.player.health*5, 5);
	
}
