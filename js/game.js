'use strict';

/* globals Phaser */
var Adventure = Adventure || {};


Adventure.Game = function() {
	this.o = {};
};

Adventure.Game.prototype = {
	getMapIndexes: function() {
		return {
			platform: this.o.map.properties.platform.split(',').map(i => parseInt(i)),
			stairs: this.o.map.properties.stairs.split(',').map(i => parseInt(i)),
			thorns: this.o.map.properties.thorns.split(',').map(i => parseInt(i)),
			enemies: parseInt(this.o.map.properties.enemies),
			collegues: parseInt(this.o.map.properties.collegues),
		};
	},
	
	createMap: function() {
		this.o.map = this.game.add.tilemap('level');
		this.o.map.addTilesetImage('blocks', 'tiles');
		this.o.map.setCollision(this.getMapIndexes().platform, true, 'level-layer');
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
	
	createPlayer: function() {
		this.o.player = new Adventure.Player(this, 32, this.game.world.height - 150);
	},
	
	
	createEnemies: function() {
		this.o.enemies = Adventure.Enemy.createFromObjects(this);
	},
	
	
	createColleagues: function() {
		this.o.colleagues = Adventure.Collegue.createFromObjects(this);
	},
	
	
	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.stage.backgroundColor = '#338fff';
		
		this.createMap();
		this.createLayer();
		this.createPlatforms();
		this.createStairs();
		this.createThorns();
		this.createEnemies();
		this.createColleagues();
		this.createPlayer();
		
		this.o.cursors = this.game.input.keyboard.createCursorKeys();
	},
	
	updateEnemies: function() {
		this.o.enemies.forEach(function(e) { e.update(); });
	},
	
	updateCollegues: function() {
		this.o.colleagues.forEach(function(c) { c.update(); });
	},
	
	update: function() {
		this.updateCollegues();
		this.updateEnemies();
		
		this.o.player.update();
	}
};
