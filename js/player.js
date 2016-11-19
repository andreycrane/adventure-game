'use strict';

/* globals Phaser */

var Adventure = Adventure || {};

Adventure.Player = function(state, x, y) {
	Phaser.Sprite.call(this, state.game, x, y, 'dude');
	
	state.game.add.existing(this);
	state.game.physics.arcade.enable(this);
	state.game.physics.arcade.collideSpriteVsTilemapLayer(this, state.o.levelLayer);
	state.game.camera.follow(this);
	
	this.state = state;
	
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 500;
	this.body.collideWorldBounds = true;
	
	this.animations.add('left', [0, 1, 2, 3], 10, true);
	this.animations.add('right', [5, 6, 7, 8], 10, true);
	
	this.body.onWorldBounds = new Phaser.Signal();
	this.body.onWorldBounds.add(function(sprite, up, down, left, righ) {
		if (down) state.game.state.restart();
	});
};

Adventure.Player.prototype = Object.create(Phaser.Sprite.prototype);
Adventure.Player.prototype.constructor = Adventure.Player;

Adventure.Player.prototype.pauseGravity = function() {
	this.body.velocity.y = 0;
	this.body.velocity.x = 0;
	this.body.allowGravity = false;
};

Adventure.Player.prototype.resumeGravity = function() {
	this.body.checkCollision.up = true;
	this.body.checkCollision.down = true;
	this.body.allowGravity = true;
};
