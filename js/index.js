'use strict';

var Adventure = Adventure || {};

/* globals Phaser */
Adventure.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'kurt-advenure');

Adventure.game.state.add('preload', Adventure.Preload);
Adventure.game.state.add('middleState', Adventure.MiddleState);
Adventure.game.state.add('menu', Adventure.Menu);
Adventure.game.state.add('game', Adventure.Game);

Adventure.game.state.start('preload');
