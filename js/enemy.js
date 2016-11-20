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
	this.body.gravity.y = 900;
	this.body.collideWorldBounds = true;
	
	this.animations.add('left', [0, 1, 2, 3], 10, true);
	this.animations.add('right', [5, 6, 7, 8], 10, true);
	
	this.tint = 0xC85054
	
	this.moveRight();
};

Adventure.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Adventure.Enemy.prototype.constructor = Adventure.Enemy;

Adventure.Enemy.velocity = 70;

Adventure.Enemy.prototype.update = function() {
	this.state.game.physics.arcade.collide(this, this.state.o.levelLayer, function() {
		if ( this.body.blocked.right ) this.moveLeft();
		if ( this.body.blocked.left ) this.moveRight();
	}, null, this);
	
	if (!this.hasPlatformLeft() && this.hasPlatformRight()) {
		this.moveRight();
	}
	
	if (this.hasPlatformLeft() && !this.hasPlatformRight()) {
		this.moveLeft();
	}
};


Adventure.Enemy.prototype.hasPlatfromTile = function(x, y) {
	var tile = this.state.o.map.getTileWorldXY(x, y, 34, 34, 'level-layer');
	
	if ( !tile ) { return false; }
	return this.state.getMapIndexes().platform.indexOf(tile.index) !== -1;
};

Adventure.Enemy.prototype.hasPlatformLeft  = function() {
	return this.hasPlatfromTile(this.left - 5, this.bottom + 5);
};

Adventure.Enemy.prototype.hasPlatformRight  = function() {
	return this.hasPlatfromTile(this.right + 5, this.bottom + 5);
};

Adventure.Enemy.prototype.moveLeft  = function() {
	this.body.velocity.x = -Adventure.Enemy.velocity;
	this.animations.play('left');
};

Adventure.Enemy.prototype.moveRight = function() {
	this.body.velocity.x = Adventure.Enemy.velocity;
	this.animations.play('right');
};

Adventure.Enemy.prototype.die = function() {
	this.kill();
};


Adventure.Enemy.createFromObjects = function(state) {
	var enemies = state.game.add.group();
	
	var t = function(game, x, y) {
		Adventure.Enemy.call(this, state, x, y);
	};
	
	t.prototype = Object.create(Adventure.Enemy.prototype);
	t.prototype.constructor = t;
	
	state.o.map.createFromObjects(
		'enemy-layer',
		state.getMapIndexes().enemies,
		'dude',
		0,
		true,
		false,
		enemies,
		t
	);
	
	return enemies;
};
