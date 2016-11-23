'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.Menu = function() {};

Adventure.Menu.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#272e35';
		
		this.title = this.game.add.text(
			this.game.world.centerX,
			this.game.world.centerY - 50,
			'Kurt Adventure',
			{
				font: '60px Bungee Inline',
				fill: 'white',
				fontStyle: 'italic'
			}
		);
		this.title.anchor.set(0.5, 0.5);
		
		this.text = this.game.add.text(
			this.game.world.centerX,
			this.game.world.centerY,
			'Press "Z" to start',
			{
				font: '15px Aldrich',
				fill: 'white'
			}
		);
		this.text.anchor.set(0.5, 0.5);
		
		this.captions = this.game.add.text(
			this.game.world.centerX,
			this.game.world.centerY + 30,
			'Press "Space" to view captions',
			{
				font: '15px Aldrich',
				fill: 'white'
			}
		);
		this.captions.anchor.set(0.5, 0.5);
	},
	
	update: function() {
		if (this.input.keyboard.isDown(Phaser.Keyboard.Z)) {
			this.game.state.start('middleState', true, false, 0);
		}
		
		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.game.state.start('captions', true, false);
		}
	}
};
