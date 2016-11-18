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
		this.o.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
		
		this.game.physics.arcade.enable(this.o.player);
		this.game.physics.arcade.collideSpriteVsTilemapLayer(this.o.player, this.o.levelLayer);
		
		this.o.player.body.bounce.y = 0.2;
		this.o.player.body.gravity.y = 300;
		this.o.player.body.collideWorldBounds = true;
		
		this.o.player.animations.add('left', [0, 1, 2, 3], 10, true);
		this.o.player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		this.o.player.body.onWorldBounds = new Phaser.Signal();
		
		this.o.player.body.onWorldBounds.add(function(sprite, up, down, left, righ) {
			if (down) this.game.state.restart();
		}, this);
	},
	
	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.stage.backgroundColor = '#338fff';
		
		this.createMap();
		this.createLayer();
		this.createPlatforms();
		this.createThorns();
		this.createPlayer();
		
		this.game.camera.follow(this.o.player);
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
				this.o.player.body.y -= 10;
			}
			if (this.o.cursors.down.isDown) {
				[1, 1, 1, 1, 1].forEach(function(i) {
					if ( !this.game.physics.arcade.overlap(this.o.player, this.o.platforms) ) {
						this.o.player.body.y += 1;
					}
				});
			}
			
			if (this.o.cursors.right.isDown) {
				this.o.player.body.x += 5;
				this.o.player.animations.play('right');
			}
			
			if (this.o.cursors.left.isDown) {
				this.o.player.body.x -= 5;
				this.o.player.animations.play('left');
			}
			
			this.o.player.body.velocity.y = 0;
			this.o.player.body.velocity.x = 0;
			this.o.player.body.allowGravity = false;
		} else {
			this.o.player.body.checkCollision.up = true;
			this.o.player.body.checkCollision.down = true;
			this.o.player.body.allowGravity = true;
		}
	},
	
	updateThorns: function() {
		var overlapThorns = this.game.physics.arcade.overlap(this.o.player, this.o.thorns);
		
		if (overlapThorns) {
			console.log('die');
		}
	},
	
	update: function() {
		this.updatePlatform();
		this.updateStairs();
	}
};
