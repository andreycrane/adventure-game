'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.Preload = function() {};

Adventure.maps = [
	{
		name: 'Stage 1. Moscow',
		
		json: {
			cacheName: 'level1',
			path: 'assets/tilemap/level1.json'
		},
		tileset: {
			cacheName: 'tileset1',
			name: 'blocks',
			path: 'assets/img/blocks1.png'
		}
	},
	{
		name: 'Stage 2. Piter',
		
		json: {
			cacheName: 'level2',
			path: 'assets/tilemap/level2.json'
		},
		tileset: {
			cacheName: 'tiles2',
			name: 'blocks',
			path: 'assets/img/blocks1.png'
		}
	}
];


Adventure.Preload.prototype = {
	preload: function() {
		var me = this;
		
		window.WebFontConfig = {
			active: function() {
				me.game.time.events.add(Phaser.Timer.SECOND, me.state.start.bind(me.state, 'menu'));
			},
			
			google: {
				families: ['Bungee Inline', 'Aldrich', 'Press Start 2P::cyrillic']
			}
		};
		
		
		// Загрузка данных карт
		Adventure.maps.forEach(function(m) {
			this.load.tilemap(m.json.cacheName, m.json.path, null, Phaser.Tilemap.TILED_JSON);
			this.load.image(m.tileset.cacheName, m.tileset.path);
		}, this);
		
		
		this.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
		this.load.spritesheet('hero', 'assets/img/hero-set.png', 34, 68);
		this.load.spritesheet('man-set', 'assets/img/man-set.png', 34, 68);
		this.load.spritesheet('woman-set', 'assets/img/woman-set.png', 34, 68);
		
		this.load.image('pasha', 'assets/img/Pasha.png', 32, 48);
		
		this.load.image('bullet', 'assets/img/bullet_sprite.png');
		this.load.image('decor', 'assets/img/decor.png');
		this.load.image('piter_back', 'assets/img/piter_back.png');
		
		this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
	},
	
	create: function() {
		this.game.stage.backgroundColor = '#272e35';
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
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
