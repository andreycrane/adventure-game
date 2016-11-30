'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			build: {
				files: {
					'dist/js/built.min.js': [
						'js/levels.js',
						'js/boot.js',
						'js/speechBubble.js',
						'js/preload.js',
						'js/middleState.js',
						'js/captions.js',
						'js/menu.js',
						'js/player.js',
						'js/enemy.js',
						'js/collegue.js',
						'js/guard.js',
						'js/gameMenu.js',
						'js/game.js',
						'js/index.js'
					],
					'dist/js/phaser.min.js': ['js/phaser.2.7.0.js']
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('default', ['uglify:build']);
};
