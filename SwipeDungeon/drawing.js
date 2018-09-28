function drawAssets(){
	//This function is triggered every frame.
	//Use the "ctx" object and the "ctx.drawImage" or "ctx.fillRect" functions to draw the game.
	ctx.fillStyle = "black";
	ctx.fillRect(game.player.bound.position.x, game.player.bound.position.y, game.player.bound.size.x, game.player.bound.size.y);
	for (var i = game.enemies.length - 1; i >= 0; i--) {
		ctx.fillStyle = "red";
		ctx.fillRect(game.enemies[i].bound.position.x, game.enemies[i].bound.position.y, game.enemies[i].bound.size.x, game.enemies[i].bound.size.y);
	}

}

function drawFX(){
	//This function is triggered every frame.
	//Draw all FX particles.
}

function drawUI(){
	//This function is triggered every frame.
	//For now, draw Coins, Health.
	ctx.fillStyle = "yellow"
	for (var i = Math.random() * 6 + 1; i > 0; i--) {
	 	ctx.filledArc(Math.random(),Math.Random(),50,0,2*Math.PI);
	}
	ctx.fillStyle = "red"
        ctx.filledRectangle(ctx.length()/2, 10, game.player.health, 5);
	
}
