'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.GameMenu = function(state) {
	this.state = state;
	
	var
		itemStyle = {
			font: '35px Press Start 2P',
			fill: 'white'
		};
	
	this.pauseHead = state.game.add.text(
		0,
		0,
		'Пауза',
		{
			font: '35px Press Start 2P',
			fill: 'white'
		}
	);
	this.pauseHead.alpha = 0;
	this.pauseHead.anchor.set(0.5, 0.5);
	
	this.menuGroup = state.game.add.group();
	
	this.menuGroup.addMultiple([
		state.game.add.text(
			0,
			0,
			'Музыка: ' + (state.game.sound.mute ? 'Выкл.' : 'Вкл.'),
			itemStyle),
		state.game.add.text(
			0,
			0,
			'Выход',
			itemStyle)
	]);
	
	this.menuGroup.setAll('anchor.x', 0.5);
	this.menuGroup.setAll('anchor.y', 0.5);
	this.menuGroup.alpha = 0;
	
	this.esc = state.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
	
	this.downArrow = this.state.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	this.upArrow = this.state.game.input.keyboard.addKey(Phaser.Keyboard.UP);
	this.enter = this.state.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	
	this.esc.onDown.add(function() {
		if ( this.state.game.paused ) {
			this.unpause();
		} else {
			this.pause();
		}
	}, this);
};

Adventure.GameMenu.MUSIC_ITEM = 0;
Adventure.GameMenu.EXIT_ITEM = 1;

Adventure.GameMenu.prototype.setActive = function(itemIdx) {
	var item = this.menuGroup.getAt(itemIdx);
	
	this.menuGroup.setAll('fill', 'white');
	item.fill = 'red';
	
	this.currentItemIdx = itemIdx;
};

Adventure.GameMenu.prototype.itemUp = function() {
	if (this.currentItemIdx < (this.menuGroup.length - 1)) {
		this.setActive(this.currentItemIdx + 1);
	} else {
		this.setActive(0);
	}
};

Adventure.GameMenu.prototype.itemDown = function() {
	if (this.currentItemIdx > 0) {
		this.setActive(this.currentItemIdx - 1);
	} else {
		this.setActive(this.menuGroup.length - 1);
	}
};

Adventure.GameMenu.prototype.itemEnter = function() {
	if ( this.currentItemIdx === Adventure.GameMenu.MUSIC_ITEM ) {
		this.musicItemEnter();
	} else if ( this.currentItemIdx == Adventure.GameMenu.EXIT_ITEM ) {
		this.exitItemEnter();
	}
};


Adventure.GameMenu.prototype.musicItemEnter = function() {
	this.muteState = !this.muteState;
	
	this.musicItemUpdate();
};

Adventure.GameMenu.prototype.musicItemUpdate = function() {
	var item = this.menuGroup.getAt(Adventure.GameMenu.MUSIC_ITEM);
	
	item.setText('Музыка: ' + (this.muteState ? 'Выкл.' : 'Вкл.'));
};

Adventure.GameMenu.prototype.exitItemEnter = function() {
	this.unpause();
	
	this.state.game.state.start('menu', true, false);
};


Adventure.GameMenu.prototype.pause = function() {
	this.muteState = this.state.game.sound.mute;
	
	this.state.game.paused = true;
	this.pauseHead.alpha = 1;
	this.menuGroup.alpha = 1;
	
	this.setCoords();
	this.setActive(Adventure.GameMenu.MUSIC_ITEM);
	
	this.downArrow.onDown.add(this.itemDown, this);
	this.upArrow.onDown.add(this.itemUp, this);
	this.enter.onDown.add(this.itemEnter, this);
	
	this.musicItemUpdate();
};

Adventure.GameMenu.prototype.unpause = function() {
	this.state.game.paused = false;
	this.pauseHead.alpha = 0;
	this.menuGroup.alpha = 0;
	
	this.downArrow.onDown.removeAll();
	this.upArrow.onDown.removeAll();
	this.enter.onDown.removeAll();
	
	this.state.game.sound.mute = this.muteState;
};


Adventure.GameMenu.prototype.debug = function() {
	this.state.game.debug.text('text.x ' + this.pauseHead.x, 400, 100);
	this.state.game.debug.text('text.y ' + this.pauseHead.y, 400, 120);
};


Adventure.GameMenu.prototype.setCoords = function() {
	this.pauseHead.x = this.state.game.camera.x + (this.state.game.camera.width / 2);
	this.pauseHead.y = this.state.game.camera.y + (this.state.game.camera.height / 2) - 100;
	
	this.menuGroup.children.forEach((item, index) => {
		item.x = this.state.game.camera.x + (this.state.game.camera.width / 2);
		item.y = this.state.game.camera.y + (this.state.game.camera.height / 2) + ((index + 1) * 50) - 100;
	});
};
