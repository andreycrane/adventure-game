'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.Enemy = function(state, x, y, key) {
	var me = this;
	
	Phaser.Sprite.call(this, state.game, x, y, key);
	
	state.game.add.existing(this);
	state.game.physics.arcade.enable(this);
	state.game.physics.arcade.collideSpriteVsTilemapLayer(this, state.o.levelLayer);
	
	this.state = state;
	
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 900;
	this.body.collideWorldBounds = true;
	
	this.animations.add('left', [0, 1, 2, 3], 10, true);
	this.animations.add('right', [5, 6, 7, 8], 10, true);
	
	this.moveRight();
	
	this.dieTween = state.game.add.tween(this).to({ y: 2000 }, 2000, Phaser.Easing.Linear.None);
	this.dieTween.onComplete.add(function() { me.kill(); });
};

Adventure.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Adventure.Enemy.prototype.constructor = Adventure.Enemy;

Adventure.Enemy.velocity = 300;

Adventure.Enemy.prototype.update = function() {
	this.state.game.physics.arcade.collide(this, this.state.o.levelLayer, function() {
		if ( this.body.blocked.right ) this.moveLeft();
		if ( this.body.blocked.left ) this.moveRight();
	}, null, this);
	
	if (!this.hasPlatformLeft() && this.hasPlatformRight() && this.isMoveLeft()) {
		this.moveRight();
	}
	
	if (this.hasPlatformLeft() && !this.hasPlatformRight() && this.isMoveRight()) {
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


Adventure.Enemy.prototype.isMoveRight = function() {
	return (this.body.velocity.x > 0);
};

Adventure.Enemy.prototype.isMoveLeft = function() {
	return (this.body.velocity.x < 0);
};

Adventure.Enemy.prototype.stop = function() {
	this.body.velocity.x = 0;
	this.frame = 4;
	
	this.animations.stop();
};

Adventure.Enemy.prototype.moveLeft = function() {
	var me = this;
	
	this.stop();
	
	setTimeout(function() {
		me.body.velocity.x = -Adventure.Enemy.velocity;
		me.animations.play('left');
	}, 1000);
};

Adventure.Enemy.prototype.moveRight = function() {
	var me = this;
	
	this.stop();
	
	setTimeout(function() {
		me.body.velocity.x = Adventure.Enemy.velocity;
		me.animations.play('right');
	}, 1000);
};

Adventure.Enemy.prototype.die = function() {
	if ( !this.dieTween.isRunning ) {
		this.state.game.sound.play('mob-die', 0.1);
		this.dieTween.start();
	}
};


Adventure.Enemy.createFromObjects = function(state) {
	var
		enemies = state.game.add.group(),
		mapData = Adventure.maps[state.o.level];
	
	var t = function(game, x, y, key) {
		Adventure.Enemy.call(this, state, x, y, key);
	};
	
	t.prototype = Object.create(Adventure.Enemy.prototype);
	t.prototype.constructor = t;
	
	state.o.map.createFromObjects(
		'enemy-layer',
		state.getMapIndexes().enemies,
		mapData.mob.cacheName,
		0,
		true,
		false,
		enemies,
		t
	);
	
	return enemies;
};
