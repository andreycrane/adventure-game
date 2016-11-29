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
		},
		bg:  {
			cacheName: 'bg1',
			path: 'assets/img/moscow/bg.png'
		},
		mob: {
			cacheName: 'mob1',
			path: 'assets/img/mob1-set.png'
		},
		guard: {
			cacheName: 'guard1',
			path: 'assets/img/pasha-set.png'
		},
		dec1: {
			cacheName: 'dec1-1',
			path: 'assets/img/rostov/decor-1.png'
		},
		dec2: {
			cacheName: 'dec1-2',
			path: 'assets/img/rostov/decor-2.png'
		},
		dec3: {
			cacheName: 'dec1-3',
			path: 'assets/img/rostov/decor-3.png'
		},
		dec4: {
			cacheName: 'dec1-4',
			path: 'assets/img/rostov/decor-4.png'
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
		},
		bg:  {
			cacheName: 'bg2',
			path: 'assets/img/piter/bg.png'
		},
		mob: {
			cacheName: 'mob2',
			path: 'assets/img/mob2-set.png'
		},
		guard: {
			cacheName: 'guard1',
			path: 'assets/img/pasha-set.png'
		},
		dec1: {
			cacheName: 'dec2-1',
			path: 'assets/img/rostov/decor-1.png'
		},
		dec2: {
			cacheName: 'dec2-1',
			path: 'assets/img/rostov/decor-2.png'
		},
		dec3: {
			cacheName: 'dec3-3',
			path: 'assets/img/rostov/decor-3.png'
		},
		dec4: {
			cacheName: 'dec4-4',
			path: 'assets/img/rostov/decor-4.png'
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
				families: ['Press Start 2P::cyrillic', 'Bungee Inline', 'Aldrich']
			}
		};
		
		
		// Загрузка данных карт
		Adventure.maps.forEach(function(m) {
			this.load.tilemap(m.json.cacheName, m.json.path, null, Phaser.Tilemap.TILED_JSON);
			
			this.load.image(m.tileset.cacheName, m.tileset.path);
			this.load.image(m.bg.cacheName, m.bg.path);
			this.load.image(m.dec1.cacheName, m.dec1.path);
			this.load.image(m.dec2.cacheName, m.dec2.path);
			this.load.image(m.dec3.cacheName, m.dec3.path);
			this.load.image(m.dec4.cacheName, m.dec4.path);
			
			this.load.spritesheet(m.mob.cacheName, m.mob.path, 34, 67);
			this.load.spritesheet(m.guard.cacheName, m.guard.path, 34, 67);
			
		}, this);
		
		
		this.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
		this.load.spritesheet('hero', 'assets/img/hero-set.png', 34, 68);
		this.load.spritesheet('man-set', 'assets/img/man-set.png', 34, 68);
		this.load.spritesheet('woman-set', 'assets/img/woman-set.png', 34, 68);
		
		this.load.image('pasha', 'assets/img/Pasha.png', 32, 48);
		this.load.image('bullet', 'assets/img/bullet_sprite.png');
		this.load.image('decor', 'assets/img/decor.png');
		this.load.image('piter_back', 'assets/img/piter_back.png');
		
		this.load.audio('track1', ['assets/music/track1.ogg']);
		this.load.audio('track2', ['assets/music/track2.ogg']);
		this.load.audio('track3', ['assets/music/track3.ogg']);
		
		this.load.audio('fire', ['assets/music/fire.ogg']);
		this.load.audio('explosion', ['assets/music/explosion.ogg']);
		this.load.audio('mob-die', ['assets/music/mob-die.ogg']);
		this.load.audio('middle', ['assets/music/middle.ogg']);
		this.load.audio('loss', ['assets/music/loss.ogg']);
		
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
		
		this.game.sound.mute = Adventure.getMuteState();
	}
};
