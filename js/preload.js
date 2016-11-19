'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.Preload = function() {};

Adventure.Preload.prototype = {
	preload: function() {
		this.load.tilemap('level', 'assets/tilemap/level.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tiles', 'assets/img/blocks.png');
		this.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
		this.load.image('pasha', 'assets/img/Pasha.png', 32, 48);
	},
	
	create: function() {
		this.state.start('game');
	}
};
