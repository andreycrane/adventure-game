'use strict';

/* globals Phaser */
var Adventure = Adventure || {};


Adventure.Game = function() {
	this.o = {};
};

Adventure.Game.prototype = {
	getPlatformIndexes: function() {
		return this.o.map.properties.platform.split(',').map(i => parseInt(i));
	},
	
	createMap: function() {
		this.o.map = this.game.add.tilemap('level');
		this.o.map.addTilesetImage('blocks', 'tiles');
		this.o.map.setCollision(this.getPlatformIndexes(), true, 'level-layer');
	},
	
	createLayer: function() {
		this.o.levelLayer = this.o.map.createLayer('level-layer');
		this.o.levelLayer.resizeWorld();
	},
	
	createPlatforms: function() {
		this.o.platforms = this.game.add.group();
		this.o.platforms.enableBody = true;
		this.o.map.createFromTiles(
			this.getPlatformIndexes(),
			null,
			null,
			'level-layer',
			this.o.platforms
		);
	},
	
	createStairs: function() {
		this.o.stairs = this.game.add.group();
		this.o.stairs.enableBody = true;
		this.o.map.createFromTiles(82, null, null, 'level-layer', this.o.stairs);
	},
	
	createThorns: function() {
		this.o.thorns = this.game.add.group();
		this.o.thorns.enableBody = true;
		this.o.map.createFromTiles(16, null, null, 'level-layer', this.o.thorns);
	},
	
	createPlayer: function() {
		this.o.player = new Adventure.Player(this, 32, this.game.world.height - 150);
	},
	
	
	createEnemies: function() {
		this.o.enemies = [];
		
		[1, 2, 3].forEach(function() {
			this.o.enemies.push(new Adventure.Enemy(this, 100, 200));
		}, this);
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
		this.createPlayer();
		
		this.o.cursors = this.game.input.keyboard.createCursorKeys();
	},
	
	updatePlatform: function() {
		var hitPlatform = this.game.physics.arcade.collide(this.o.player, this.o.levelLayer);
		
		this.o.player.body.velocity.x = 0;
		
		if ( this.o.cursors.left.isDown ) {
			this.o.player.body.velocity.x = -150;
			this.o.player.animations.play('left');
		} else if ( this.o.cursors.right.isDown ) {
			this.o.player.body.velocity.x = 150;
			this.o.player.animations.play('right');
		} else {
			this.o.player.animations.stop();
			this.o.player.frame = 4;
		}
		
		if (this.o.cursors.up.isDown && hitPlatform) {
			this.o.player.body.velocity.y = -350;
		}
	},
	
	updateStairs: function() {
		var overlapStairs = this.game.physics.arcade.overlap(this.o.player, this.o.stairs);
		
		if (overlapStairs) {
			if (this.o.cursors.up.isDown) {
				this.o.player.body.y -= 100;
			}
			if (this.o.cursors.down.isDown) {
				[1, 1, 1, 1, 1].forEach(function(i) {
					if ( !this.game.physics.arcade.overlap(this.o.player, this.o.platforms) ) {
						this.o.player.body.y += 1;
					}
				}, this);
			}
			
			if (this.o.cursors.right.isDown) {
				this.o.player.body.x += 5;
				this.o.player.animations.play('right');
			}
			
			if (this.o.cursors.left.isDown) {
				this.o.player.body.x -= 5;
				this.o.player.animations.play('left');
			}
			
			this.o.player.pauseGravity();
		} else {
			this.o.player.resumeGravity();
		}
	},
	
	updateThorns: function() {
		var overlapThorns = this.game.physics.arcade.overlap(this.o.player, this.o.thorns);
		
		if (overlapThorns) {
			console.log('die');
		}
	},
	
	
	updateEnemies: function() {
		this.o.enemies.forEach(function(e) { e.update(); });
	},
	
	update: function() {
		this.updatePlatform();
		this.updateStairs();
		this.updateThorns();
		this.updateEnemies();
	}
};
