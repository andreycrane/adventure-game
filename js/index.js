'use strict';

/* globals Phaser */
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'kurt-advenure', { preload: preload, create: create, update: update });


function preload() {
	game.load.tilemap('level', 'assets/tilemap/level.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles', 'assets/img/blocks.png');
	game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
}


var
	map,
	levelLayer,
	water,
	player,
	cursors;

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	game.stage.backgroundColor = '#338fff';
	
	map = game.add.tilemap('level');
	map.addTilesetImage('blocks', 'tiles');
	console.log(map.properties);
	
	
	levelLayer = map.createLayer('level-layer');
	
	console.log(map.properties.platform.split(',').map(i => parseInt(i)));
	map.setCollision(map.properties.platform.split(',').map(i => parseInt(i)), true, 'level-layer');

	levelLayer.resizeWorld();
	
	player = game.add.sprite(32, game.world.height - 150, 'dude');
	
	//  We need to enable physics on the player
	game.physics.arcade.enable(player);
	
	game.physics.arcade.collideSpriteVsTilemapLayer(player, levelLayer);
	
	//  Player physics properties. Give the little guy a slight bounce.
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;
	
	//  Our two animations, walking left and right.
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	cursors = game.input.keyboard.createCursorKeys();
	game.camera.follow(player);
	
	player.body.onWorldBounds = new Phaser.Signal();
	
	player.body.onWorldBounds.add(function(sprite, up, down, left, righ) {
		if (down) game.state.restart();
	}, this);
}

function update() {
	var hitPlatform = game.physics.arcade.collide(player, levelLayer);
	
	player.body.velocity.x = 0;
	
	if ( cursors.left.isDown ) {
		player.body.velocity.x = -150;
		player.animations.play('left');
	} else if ( cursors.right.isDown ) {
		player.body.velocity.x = 150;
		player.animations.play('right');
	} else {
		player.animations.stop();
		player.frame = 4;
	}
	
	if (cursors.up.isDown && hitPlatform) {
		player.body.velocity.y = -350;
	}
}
