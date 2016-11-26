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
	
	if (this.state.game.physics.arcade.overlap(this, this.state.o.player)) {
		this.showText();
	}
};


Adventure.Collegue.prototype.showText = function() {
	var me = this;
	
	if ( !this.t ) {
		this.t = new Adventure.SpeechBubble(this.state, this.left, this.top, this.congradulation);
		this.t.hideText(function() { me.kill(); });
	}
};

Adventure.Collegue.createFromObjects = function(state) {
	var collegues = state.game.add.group();
	
	var t = function(game, x, y) {
		Adventure.Collegue.call(this, state, x, y);
	};
	
	t.prototype = Object.create(Adventure.Collegue.prototype);
	t.prototype.constructor = t;
	
	state.o.map.createFromObjects(
		'collegue-layer',
		state.getMapIndexes().collegues,
		'dude',
		0,
		true,
		false,
		collegues,
		t
	);
	
	return collegues;
};
