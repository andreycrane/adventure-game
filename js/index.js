'use strict';

var Adventure = Adventure || {};

/* globals Phaser */
Adventure.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'kurt-advenure');
Adventure.game.state.start('preload');
