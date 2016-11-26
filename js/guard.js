'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.Guard = function(state, x, y) {
	Phaser.Sprite.call(this, state.game, x, y, 'dude');
	
	state.game.add.existing(this);
	state.game.physics.arcade.enable(this);
	state.game.physics.arcade.collideSpriteVsTilemapLayer(this, state.o.levelLayer);
	
	this.state = state;
	
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 900;
	this.body.collideWorldBounds = true;
	
	this.t = new Adventure.SpeechBubble(this.state);
};

Adventure.Guard.prototype = Object.create(Phaser.Sprite.prototype);
Adventure.Guard.prototype.constructor = Adventure.Guard;

Adventure.Guard.prototype.showText = function(text) {
	if ( !this.t.shown ) {
		this.t.showText(text, this.left, this.top);
	}
};

Adventure.Guard.prototype.hideText = function() {
	this.t.hideText();
};

Adventure.Guard.prototype.update = function() {
	var hitPlayer, livingEnemies, livingCollegues;
	
	this.state.game.physics.arcade.collide(this, this.state.o.levelLayer);
	
	hitPlayer = this.state.game.physics.arcade.overlap(this, this.state.o.player);
	
	if ( hitPlayer ) {
		livingEnemies = this.state.o.enemies.countLiving();
		livingCollegues = this.state.o.collegues.countLiving();
		
		if (livingEnemies > 0 || livingCollegues > 0) {
			this.showText('Ты собрал не всех коллег и не уничтожил врагов! Я не могу тебя пропустить... :(');
		} else {
			this.moveNext();
		}
	} else {
		this.hideText();
	}
};

Adventure.Guard.prototype.moveNext = function() {
	var me = this;
	
	this.showText('Ну что, полетели дальше? :)');
	
	this.hideTextTween(function() {
		if (me.state.o.level < (Adventure.maps.length - 1)) {
			me.state.game.state.start('middleState', true, false, me.state.o.level + 1);
		} else {
			me.state.game.state.start('captions', true, false);
		}
	});
};

Adventure.Guard.createFromObjects = function(state) {
	var guards = state.game.add.group();
	
	var t = function(game, x, y) {
		Adventure.Guard.call(this, state, x, y);
	};
	
	t.prototype = Object.create(Adventure.Guard.prototype);
	t.prototype.constructor = t;
	
	state.o.map.createFromObjects(
		'guard-layer',
		state.getMapIndexes().guards,
		'dude',
		0,
		true,
		false,
		guards,
		t
	);
	
	return guards;
};
