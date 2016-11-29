'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.MiddleState = function() {};

Adventure.MiddleState.prototype = {
	init: function(level, timeout) {
		this.level = level;
		
		this.game.world.resize(1000, 600);
		this.game.world.setBounds(0, 0, 1000, 600);
		this.game.sound.stopAll();
		
		this.middleSound = this.game.sound.add('middle');
		
		this.middleSound.onStop.addOnce(function() {
			this.game.state.start('game', true, false, this.level);
		}, this);
		
	},
	
	create: function() {
		var
			me = this,
			map = Adventure.maps[this.level];
		
		this.game.stage.backgroundColor = '#000000';
		
		this.title = this.game.add.text(
			this.game.world.centerX,
			this.game.world.centerY - 50,
			map.name,
			{
				font: '40px Press Start 2P',
				fill: 'white'
			}
		);
		this.title.anchor.set(0.5, 0.5);
		this.middleSound.play();
	}
};
