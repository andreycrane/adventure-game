'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.Preload = function() {};

Adventure.Preload.prototype = {
	preload: function() {
		var me = this;
		
		window.WebFontConfig = {
			active: function() {
				me.game.time.events.add(Phaser.Timer.SECOND, me.state.start.bind(me.state, 'menu'));
			},
			
			google: {
				families: ['Bungee Inline', 'Aldrich']
			}
		};
		
		this.load.tilemap('level', 'assets/tilemap/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tiles', 'assets/img/blocks1.png');
		this.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
		this.load.image('pasha', 'assets/img/Pasha.png', 32, 48);
		this.load.image('bullet', 'assets/img/bullet_sprite.png');
		this.load.image('decor', 'assets/img/decor.png');
		this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
	},
	
	create: function() {
		this.game.stage.backgroundColor = '#272e35';
		
		this.title = this.game.add.text(
			this.game.world.centerX,
			this.game.world.centerY - 10,
			'Loading...',
			{
				font: '50px',
				fill: 'white'
			}
		);
		this.title.anchor.set(0.5, 0.5);
	}
};
