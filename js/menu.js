'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.Menu = function() {};

Adventure.Menu.prototype = {
	init: function() {
		this.game.world.resize(1000, 600);
		this.game.world.setBounds(0, 0, 1000, 600);
		this.game.sound.stopAll();
	},
	
	create: function() {
		this.game.stage.backgroundColor = '#272e35';
		
		this.game.add.image(0, 0, 'intro');
		
		//this.title = this.game.add.text(
			//this.game.world.centerX,
			//this.game.world.centerY - 50,
			//'Kurt Adventure',
			//{
				//font: '60px Bungee Inline',
				//fill: 'white',
				//fontStyle: 'italic'
			//}
		//);
		//this.title.anchor.set(0.5, 0.5);
		
		//this.text = this.game.add.text(
			//this.game.world.centerX,
			//this.game.world.centerY,
			//'Press "Enter" to start',
			//{
				//font: '18px Press Start 2P',
				//fill: 'white'
			//}
		//);
		//this.text.anchor.set(0.5, 0.5);
		
		//this.captions = this.game.add.text(
			//this.game.world.centerX,
			//this.game.world.centerY + 33,
			//'Press "Space" to view captions',
			//{
				//font: '18px Press Start 2P',
				//fill: 'white'
			//}
		//);
		//this.captions.anchor.set(0.5, 0.5);
		
		this.game.sound.play('track1', 0.3);
	},
	
	update: function() {
		if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.game.state.start('middleState', true, false, 0);
		}
		
		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.game.state.start('captions', true, false);
		}
	}
};
