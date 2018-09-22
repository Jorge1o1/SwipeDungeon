function drawAssets(){
	//This function is triggered every frame.
	//Use the "ctx" object and the "ctx.drawImage" or "ctx.fillRect" functions to draw the game.

	ctx.fillRect(game.player.bound.position.x, game.player.bound.position.y, game.player.bound.size.x, game.player.bound.size.y);

}

function drawFX(){
	//This function is triggered every frame.
	//Draw all FX particles.
	
}

function drawUI(){
	//This function is triggered every frame.
	//For now, draw Coins, Health.
}