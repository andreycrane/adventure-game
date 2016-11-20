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
	
	
	var style = {
		font: "10px Arial",
		fill: "#000000",
		wordWrap: true,
		wordWrapWidth: 60,
		align: "center",
		backgroundColor: "#ffffff" };
	
	this.text = state.game.add.text(this.right, this.top, "- text on a sprite -\ndrag me", style);
	this.text.anchor.set(0.5);
	this.text.y -= this.text.height;
	
	this.hideText();
};

Adventure.Collegue.prototype = Object.create(Phaser.Sprite.prototype);
Adventure.Collegue.prototype.constructor = Adventure.Collegue;


Adventure.Collegue.prototype.update = function() {
	this.state.game.physics.arcade.collide(this, this.state.o.levelLayer);
	
	var hitPlayer = this.state.game.physics.arcade.overlap(this, this.state.o.player);
	
	if (hitPlayer) {
		this.showText();
	} else {
		this.hideText();
	}
};


Adventure.Collegue.prototype.showText = function() {
	this.text.setText(this.congradulation);
	this.text.alpha = 1;
};

Adventure.Collegue.prototype.hideText = function() {
	this.text.alpha = 0;
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
