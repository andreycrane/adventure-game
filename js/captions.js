'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.Captions = function() {};

Adventure.Captions.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#272e35';
		
		this.text = this.game.add.text(
			this.game.world.centerX,
			this.game.world.centerY,
			'Back to start manue "Esc"',
			{
				font: '15px Aldrich',
				fill: 'white'
			}
		);
		this.text.anchor.set(0.5, 0.5);
	},
	
	update: function() {
		if (this.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			this.game.state.start('menu', true, false);
		}
	}
};
