'use strict';

/* globals Phaser */

var Adventure = Adventure || {};

Adventure.Player = function(state, x, y) {
	Phaser.Sprite.call(this, state.game, x, y, 'hero', 6);
	
	state.game.add.existing(this);
	state.game.physics.arcade.enable(this);
	state.game.physics.arcade.collideSpriteVsTilemapLayer(this, state.o.levelLayer);
	state.game.camera.follow(this);
	
	this.state = state;
	
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 300;
	this.body.collideWorldBounds = true;
	
	this.animations.add('left', [2, 3, 4, 5], 10, true);
	this.animations.add('right', [7, 8, 9,10], 10, true);
	this.animations.add('coding', [0, 1, 11, 12], 10, true);
	
	this.body.onWorldBounds = new Phaser.Signal();
	this.body.onWorldBounds.add(function(sprite, up, down, left, righ) {
		if (down) this.die();
	}, this);
	
	// Направление в которое смотрит игрок
	this.direction = 'right';
	
	// время начала бездействия
	this.stopTime = state.game.time.now;
	
	// Создаем пустую группу спрайтов для пуль
	this.bulletPool = state.game.add.group();
	
	// Подключаем физику для всей группы спрайтов
	this.bulletPool.enableBody = true;
	this.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;
	
	// Создаем сотню заготовок спрайтов пуль
	// по умолчанию они не отображены на экране
	this.bulletPool.createMultiple(100, 'bullet');
	
	// Устанавливаем якоря спрайтов на центр
	this.bulletPool.setAll('anchor.x', 0.5);
	this.bulletPool.setAll('anchor.y', 0.5);
	
	// Автоматически уничтожаем пули если они выходят за границу экрана
	this.bulletPool.setAll('outOfBoundsKill', true);
	this.bulletPool.setAll('checkWorldBounds', true);
	// Время когда можно будет выстрелить еще раз
	this.nextShotAt = 0;
	// Задержка до следующего выстрела
	this.shotDelay = 100;
};

Adventure.Player.prototype = Object.create(Phaser.Sprite.prototype);
Adventure.Player.prototype.constructor = Adventure.Player;

Adventure.Player.prototype.pauseGravity = function() {
	this.body.velocity.y = 0;
	this.body.allowGravity = false;
};

Adventure.Player.prototype.resumeGravity = function() {
	this.body.checkCollision.up = true;
	this.body.checkCollision.down = true;
	this.body.allowGravity = true;
};


Adventure.Player.prototype.moveLeft = function() {
	this.body.velocity.x = -150;
	this.animations.play('left');
	this.direction = 'left';
	// время начала бездействия
	this.stopTime = this.state.game.time.now;
};

Adventure.Player.prototype.moveRight = function() {
	this.body.velocity.x = 150;
	this.animations.play('right');
	this.direction = 'right';
	// время начала бездействия
	this.stopTime = this.state.game.time.now;
};

Adventure.Player.prototype.fire = function() {
	// Проверка задержки выстрела
	if (this.nextShotAt > this.state.time.now) {
		return;
	}
	
	// Проверка доступности спрайтов пуль
	if (this.bulletPool.countDead() === 0) {
		return;
	}
	
	// Отмечаем время доступности следующего выстрела
	this.nextShotAt = this.state.time.now + this.shotDelay;
	// Извлекаем первый неиспользуемый спрайт пули
	var bullet = this.bulletPool.getFirstExists(false);
	// Сбрасываем спрайт и назначаем ему новое положение
	bullet.reset(this.x + (this.width / 2), this.y + (this.height / 2));
	
	bullet.body.velocity.x = (this.direction == 'right') ? 200 : -200;
	
	// время начала бездействия
	this.stopTime = this.state.game.time.now;
};

Adventure.Player.prototype.die = function() {
	this.state.game.state.restart(true, false, this.state.o.level);
};

Adventure.Player.prototype.updatePlatform = function() {
	var hitPlatform = this.state.game.physics.arcade.collide(this, this.state.o.levelLayer);
	
	this.body.velocity.x = 0;
	
	if ( this.state.o.cursors.left.isDown ) {
		this.moveLeft();
	} else if ( this.state.o.cursors.right.isDown ) {
		this.moveRight();
	} else {
		if (this.state.game.time.now - this.stopTime > 4000) {
			this.animations.play('coding');
		} else {
			this.animations.stop();
			this.frame = 6;
		}
	}
	
	if (this.state.o.cursors.up.isDown && hitPlatform) {
		this.body.velocity.y = -350;
	}
};


Adventure.Player.prototype.updateStairs = function() {
	var overlapStairs = this.state.game.physics.arcade.overlap(this, this.state.o.stairs);
	
	if (overlapStairs) {
		if (this.state.o.cursors.up.isDown) {
			this.body.y -= 5;
			// время начала бездействия
			this.stopTime = this.state.game.time.now;
		}
		if (this.state.o.cursors.down.isDown) {
			// время начала бездействия
			this.stopTime = this.state.game.time.now;
			
			[1, 1, 1, 1, 1].forEach(function(i) {
				if ( !this.state.game.physics.arcade.overlap(this, this.state.o.platforms) ) {
					this.body.y += 1;
				}
			}, this);
		}
		
		if (this.state.o.cursors.right.isDown) {
			this.moveRight();
		}
		
		if (this.state.o.cursors.left.isDown) {
			this.moveLeft();
		}
		
		this.pauseGravity();
	} else {
		this.resumeGravity();
	}
};

Adventure.Player.prototype.updateThorns = function() {
	var overlapThorns = this.state.game.physics.arcade.overlap(this, this.state.o.thorns);
	
	if (overlapThorns) {
		this.die();
	}
};


Adventure.Player.prototype.updateEnemies = function() {
	// Пересечение пуль с врагами
	this.state.game.physics.arcade.overlap(this.bulletPool, this.state.o.enemies, this.enemyHit, null, this);
	
	this.state.game.physics.arcade.collide(this, this.state.o.enemies, function(player, enemy) {
		if( this.body.touching.right ||
			this.body.touching.left ||
			this.body.touching.top ) {
			
			this.die();
		}
		
		if ( this.body.touching.down ) {
			enemy.die();
		}
	}, null, this);
};

Adventure.Player.prototype.enemyHit = function(bullet, enemy) {
	// убиваем пулю и врага
	bullet.kill();
	enemy.die();
};


Adventure.Player.prototype.update = function() {
	this.updatePlatform();
	this.updateStairs();
	this.updateThorns();
	this.updateEnemies();
	
	if (this.state.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		this.fire();
	}
	
};
