'use strict';

/* globals Phaser */

var Adventure = Adventure || {};

Adventure.Player = function(state, x, y) {
	Phaser.Sprite.call(this, state.game, x, y, 'dude');
	
	state.game.add.existing(this);
	state.game.physics.arcade.enable(this);
	state.game.physics.arcade.collideSpriteVsTilemapLayer(this, state.o.levelLayer);
	state.game.camera.follow(this);
	
	this.state = state;
	
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 500;
	this.body.collideWorldBounds = true;
	
	this.animations.add('left', [0, 1, 2, 3], 10, true);
	this.animations.add('right', [5, 6, 7, 8], 10, true);
	
	this.body.onWorldBounds = new Phaser.Signal();
	this.body.onWorldBounds.add(function(sprite, up, down, left, righ) {
		if (down) state.game.state.restart();
	});
	
	// Направление в которое смотрит игрок
	this.direction = 'right';
	
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
	this.body.velocity.x = 0;
	this.body.allowGravity = false;
};

Adventure.Player.prototype.resumeGravity = function() {
	this.body.checkCollision.up = true;
	this.body.checkCollision.down = true;
	this.body.allowGravity = true;
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
};
