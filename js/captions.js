'use strict';

/* globals document, Phaser */
var Adventure = Adventure || {};

Adventure.Captions = function() {};

Adventure.Captions.prototype = {
	init: function(level) {
		this.game.world.resize(1000, 600);
		this.game.world.setBounds(0, 0, 1000, 600);
		this.game.sound.stopAll();
	},
	
	create: function() {
		this.game.stage.backgroundColor = '#272e35';
		
		this.captions = this.game.add.text(
			this.game.world.centerX,
			40,
			this.game.cache.getText('captions'),
			{
				font: '20px Press Start 2P',
				fill: 'white',
				wordWrap: true,
				wordWrapWidth: this.game.camera.width - 50
			}
		);
		this.captions.anchor.set(0.5, 0);
		
		this.gr = this.game.add.graphics(0, 0);
		this.gr.beginFill(0x272e35);
		this.gr.drawRect(0, 0, this.game.camera.width, 50);
		this.gr.endFill();
		
		this.text = this.game.add.text(
			this.game.world.centerX,
			30,
			'Титры',
			{
				font: '25px Press Start 2P',
				backgroundColor: '#272e35',
				fill: 'white',
				wordWrap: true,
				wordWrapWidth: this.game.camera.width
			}
		);
		this.text.anchor.set(0.5, 0.5);
		this.text.setTextBounds(0, 0, this.game.camera.width, 20);
		
		console.log(this.captions.height);
		this.captionsTween = this.game.add.tween(this.captions).to({ y: -this.captions.height }, 120 * 1000, Phaser.Easing.Linear.None);
		this.captionsTween.start();
		
		this.captionsTween.onComplete.add(function() {
			this.game.state.start('menu');
		}, this);
		
		this.game.sound.play('track4', 0.3);
	},
	
	update: function() {
		if (this.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			this.game.state.start('menu', true, false);
		}
	}
};
