'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.Preload = function() {};

Adventure.Preload.prototype = {
	updateProgress: function() {
		this.loaderText.setText(this.load.progress + '%');
	},
	
	preload: function() {
		var me = this;
		
		this.loadingBar = this.add.sprite(
			this.state.game.camera.x + (this.state.game.camera.width / 2),
			this.state.game.camera.y + (this.state.game.camera.height / 2),
			"loading"
		);
		this.loadingBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(this.loadingBar);
		
		this.add.text(0, 0, "test text", { font: '10px Press Start 2P', fill: 'black' });
		
		this.loaderText = this.add.text(
			this.state.game.camera.x + (this.state.game.camera.width / 2),
			this.state.game.camera.y + (this.state.game.camera.height / 2) - 20,
			"0%",
			{
				font: '15px Aldrich',
				fill: 'white'
			}
		);
		this.loaderText.anchor.set(0.5, 0);
		
		this.loopedProgress = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateProgress, this);
		
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
		
		
		this.load.spritesheet('hero', 'assets/img/hero-set.png', 34, 68);
		this.load.spritesheet('man-set', 'assets/img/man-set.png', 34, 68);
		this.load.spritesheet('woman-set', 'assets/img/woman-set.png', 34, 68);
		
		this.load.image('bullet', 'assets/img/bullet_sprite.png');
		
		this.load.audio('track1', ['assets/music/track1.ogg']);
		this.load.audio('track3', ['assets/music/track3.ogg']);
		this.load.audio('track4', ['assets/music/track4.ogg']);
		
		this.load.audio('fire', ['assets/music/fire.ogg']);
		this.load.audio('explosion', ['assets/music/explosion.ogg']);
		this.load.audio('mob-die', ['assets/music/mob-die.ogg']);
		this.load.audio('middle', ['assets/music/middle.ogg']);
		this.load.audio('loss', ['assets/music/loss.ogg']);
		
		this.load.text('captions', 'assets/text/captions.txt');
	},
	
	create: function() {
		this.game.time.events.remove(this.loopedProgress);
		this.game.state.start('menu');
	}
};
