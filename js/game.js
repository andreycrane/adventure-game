'use strict';

/* globals Phaser */
var Adventure = Adventure || {};


Adventure.Game = function() {
	this.o = {};
};

Adventure.Game.prototype = {
	init: function(level) {
		this.o = {};
		this.o.level = level;
		
		this.game.sound.stopAll();
	},
	
	getMapIndexes: function() {
		return {
			platform: this.o.map.properties.platform.split(',').map(function(i) { return parseInt(i); }),
			stairs: this.o.map.properties.stairs.split(',').map(function(i) { return parseInt(i); }),
			thorns: this.o.map.properties.thorns.split(',').map(function(i) { return parseInt(i); }),
			enemies: parseInt(this.o.map.properties.enemies),
			colleguesMan: parseInt(this.o.map.properties.colleguesMan),
			colleguesWoman: parseInt(this.o.map.properties.colleguesWoman),
			guards: parseInt(this.o.map.properties.guards)
		};
	},
	
	
	createBack: function() {
		var mapData = Adventure.maps[this.o.level];
		
		this.back = this.game.add.image(0, 0, mapData.bg.cacheName);
		this.back.fixedToCamera = true;
	},
	
	
	createMap: function() {
		var mapData = Adventure.maps[this.o.level];
		
		this.o.map = this.game.add.tilemap(mapData.json.cacheName);
		this.o.map.addTilesetImage(mapData.tileset.name, mapData.tileset.cacheName);
		this.o.map.setCollision(this.getMapIndexes().platform, true, 'level-layer');
	},
	
	createDecors: function() {
		var
			mapData = Adventure.maps[this.o.level],
			dec1 = this.game.cache.getImage(mapData.dec1.cacheName),
			dec2 = this.game.cache.getImage(mapData.dec2.cacheName),
			dec3 = this.game.cache.getImage(mapData.dec3.cacheName);
		
		this.o.dec1 = this.game.add.tileSprite(
			0,
			this.o.map.heightInPixels - dec1.height,
			this.o.map.widthInPixels,
			dec1.height,
			mapData.dec1.cacheName
		);
		
		this.o.dec2 = this.game.add.tileSprite(
			0,
			this.o.map.heightInPixels - dec2.height,
			this.o.map.widthInPixels,
			dec2.height,
			mapData.dec2.cacheName
		);
		
		
		this.o.dec3 = this.game.add.tileSprite(
			0,
			this.o.map.heightInPixels - dec3.height,
			this.o.map.widthInPixels,
			dec3.height,
			mapData.dec3.cacheName
		);
	},
	
	createLayer: function() {
		this.o.levelLayer = this.o.map.createLayer('level-layer');
		this.o.levelLayer.resizeWorld();
	},
	
	createPlatforms: function() {
		this.o.platforms = this.game.add.group();
		this.o.platforms.enableBody = true;
		this.o.map.createFromTiles(
			this.getMapIndexes().platform,
			null,
			null,
			'level-layer',
			this.o.platforms
		);
	},
	
	createStairs: function() {
		this.o.stairs = this.game.add.group();
		this.o.stairs.enableBody = true;
		this.o.map.createFromTiles(this.getMapIndexes().stairs, null, null, 'level-layer', this.o.stairs);
	},
	
	createThorns: function() {
		this.o.thorns = this.game.add.group();
		this.o.thorns.enableBody = true;
		this.o.map.createFromTiles(this.getMapIndexes().thorns, null, null, 'level-layer', this.o.thorns);
	},
	
	createPause: function() {
		this.o.gameMenu = new Adventure.GameMenu(this);
	},
	
	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.stage.backgroundColor = '#272e35';
		
		this.createBack();
		this.createMap();
		this.createDecors();
		this.createLayer();
		this.createPlatforms();
		this.createStairs();
		this.createThorns();
		
		this.o.enemies = Adventure.Enemy.createFromObjects(this);
		this.o.collegues = Adventure.Collegue.createFromObjects(this);
		this.o.guards = Adventure.Guard.createFromObjects(this);
		this.o.player = new Adventure.Player(this, 32, this.game.world.height - 150);
		
		this.o.cursors = this.game.input.keyboard.createCursorKeys();
		
		this.o.levelSound = this.game.sound.add('track3', 0.3, true);
		this.o.levelSound.play();
		
		this.createPause();
	},
	
	
	updateEnemies: function() {
		this.o.enemies.forEach(function(e) { e.update(); });
	},
	
	updateCollegues: function() {
		this.o.collegues.forEach(function(c) { c.update(); });
	},
	
	updateGuards: function() {
		this.o.guards.forEach(function(g) { g.update(); });
	},
	
	updateDecors: function() {
		this.o.dec1.tilePosition.x = -this.game.camera.x * 0.025;
		this.o.dec2.tilePosition.x = -this.game.camera.x * 0.05;
		this.o.dec3.tilePosition.x = -this.game.camera.x * 0.1;
	},
	
	update: function() {
		this.updateDecors();
		this.updateCollegues();
		this.updateEnemies();
		this.updateGuards();
		
		this.o.player.update();
	}
};
