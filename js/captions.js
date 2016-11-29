'use strict';

/* globals document, Phaser */
var Adventure = Adventure || {};

Adventure.Captions = function() {};

Adventure.Captions.prototype = {
	init: function(level, timeout) {
		this.game.world.resize(1000, 600);
		this.game.world.setBounds(0, 0, 1000, 600);
		this.game.sound.stopAll();
	},
	
	create: function() {
		this.game.stage.backgroundColor = '#272e35';
		
		this.text = this.game.add.text(
			this.game.world.centerX,
			10,
			'Титры',
			{
				font: '25px Press Start 2P',
				fill: 'white'
			}
		);
		this.text.anchor.set(0.5, 0.5);
		
		this.captions = this.game.add.text(
			this.game.world.centerX,
			40,
			document.getElementById('captions').innerText,
			{
				font: '20px Press Start 2P',
				fill: 'white'
			}
		);
		this.captions.anchor.set(0.5, 0.5);
	},
	
	update: function() {
		if (this.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			this.game.state.start('menu', true, false);
		}
	}
};
