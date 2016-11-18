'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.Enemy = function(state, x, y) {
	Phaser.Sprite.call(this, state.game, x, y, 'dude');
	
	state.game.add.existing(this);
	state.game.physics.arcade.enable(this);
	state.game.physics.arcade.collideSpriteVsTilemapLayer(this, state.o.levelLayer);
	
	this.state = state;
	
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 500;
	this.body.collideWorldBounds = true;
	this.body.velocity.x = 80;
	
	this.animations.add('left', [0, 1, 2, 3], 10, true);
	this.animations.add('right', [5, 6, 7, 8], 10, true);
	
	this.tint = Math.random() * 0xffffff;
};

Adventure.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Adventure.Enemy.prototype.constructor = Adventure.Enemy;

Adventure.Enemy.prototype.update = function() {
	this.state.game.physics.arcade.collide(this, this.state.o.levelLayer, function (slime, platform) {
		console.log(slime, platform);
		// if slime is moving to the right, 
		// check if its position greater than the width of the platform minus its width
		// if slime is moving to the left, 
		// check if its position exceeds the left-most point of the platform
		if (slime.body.velocity.x > 0 && slime.x > platform.x + (platform.width - slime.width) ||
				slime.body.velocity.x < 0 && slime.x < platform.x) {
			slime.body.velocity.x *= -1; 
		} 
		if (slime.body.velocity.x > 0) {
			slime.animations.play('right');
		} else {
			slime.animations.play('left');
		}
	});
};
