'use strict';

/* globals Phaser */

var Adventure = Adventure || {};

Adventure.Collegue = function(state, x, y) {
	Phaser.Sprite.call(this, state.game, x, y, 'dude');
	
	state.game.add.existing(this);
	state.game.physics.arcade.enable(this);
	state.game.physics.arcade.collideSpriteVsTilemapLayer(this, state.o.levelLayer);
	
	this.state = state;
	
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 500;
	this.body.collideWorldBounds = true;
	
	this.tint = 0xf2d109;
};

Adventure.Collegue.prototype = Object.create(Phaser.Sprite.prototype);
Adventure.Collegue.prototype.constructor = Adventure.Collegue;


Adventure.Collegue.prototype.update = function() {
	this.state.game.physics.arcade.collide(this, this.state.o.levelLayer);
};
