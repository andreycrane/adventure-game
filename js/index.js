'use strict';

/* globals window, Phaser */
var Adventure = Adventure || {};


Adventure.getMuteState = function() {
	return window.localStorage.getItem('muteState') === 'true';
};

Adventure.setMuteState = function(state) {
	window.localStorage.setItem('muteState', state);
};

/* globals Phaser */
Adventure.game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'kurt-advenure');

Adventure.game.state.add('boot', Adventure.Boot);
Adventure.game.state.add('preload', Adventure.Preload);
Adventure.game.state.add('middleState', Adventure.MiddleState);
Adventure.game.state.add('captions', Adventure.Captions);
Adventure.game.state.add('menu', Adventure.Menu);
Adventure.game.state.add('game', Adventure.Game);

Adventure.game.state.start('boot');
