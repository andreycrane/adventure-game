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
				families: ['Bungee Inline', 'Press Start 2P:regular:cyrillic,latin'],
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
		this.load.audio('track3', ['assets/music/track3.ogg']);
		this.load.audio('track4', ['assets/music/track4.ogg']);
		
		this.load.audio('fire', ['assets/music/fire.ogg']);
		this.load.audio('explosion', ['assets/music/explosion.ogg']);
		this.load.audio('mob-die', ['assets/music/mob-die.ogg']);
		this.load.audio('middle', ['assets/music/middle.ogg']);
		this.load.audio('loss', ['assets/music/loss.ogg']);
		
		this.load.text('captions', 'assets/text/captions.txt');
		
		this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
	},
	
	create: function() {
		this.game.stage.backgroundColor = '#272e35';
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		this.title = this.game.add.text(
			this.game.world.centerX,
			this.game.world.centerY - 10,
			'Loading...',
			{
				font: '40px Press Start 2P',
				fill: 'white'
			}
		);
		this.title.anchor.set(0.5, 0.5);
		
		this.game.sound.mute = Adventure.getMuteState();
	}
};
