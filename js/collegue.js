'use strict';

/* globals Phaser */

var Adventure = Adventure || {};

Adventure.Collegue = function(state, x, y, key) {
	Phaser.Sprite.call(this, state.game, x, y, key);
	
	state.game.add.existing(this);
	state.game.physics.arcade.enable(this);
	state.game.physics.arcade.collideSpriteVsTilemapLayer(this, state.o.levelLayer);
	
	this.state = state;
	
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 500;
	this.body.collideWorldBounds = true;
	
	this.t = new Adventure.SpeechBubble(this.state);
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
	
	if ( !this.t.shown ) {
		this.t.showText(me.congradulation, this.left, this.top);
		this.t.hideTextTween(function() { me.kill(); });
	}
};

Adventure.Collegue.createFromObjects = function(state) {
	var collegues = state.game.add.group();
	
	var t = function(game, x, y, key) {
		Adventure.Collegue.call(this, state, x, y, key);
	};
	
	t.prototype = Object.create(Adventure.Collegue.prototype);
	t.prototype.constructor = t;
	
	state.o.map.createFromObjects(
		'collegue-layer',
		state.getMapIndexes().colleguesMan,
		'man-set',
		0,
		true,
		false,
		collegues,
		t
	);
	
	state.o.map.createFromObjects(
		'collegue-layer',
		state.getMapIndexes().colleguesWoman,
		'woman-set',
		0,
		true,
		false,
		collegues,
		t
	);
	
	return collegues;
};
