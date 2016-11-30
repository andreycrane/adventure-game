/* globals Phaser */
var Adventure = Adventure || {};

Adventure.Boot = function() {};

Adventure.Boot.prototype = {
	preload: function() {
		var me = this;
		
		window.WebFontConfig = {
			active: function() {
				me.game.state.start("preload");
			},
			
			google: {
				families: ['Bungee Inline', 'Aldrich', 'Press Start 2P:regular:cyrillic,latin'],
			}
		};
		
		this.game.load.image("loading","assets/img/loading.png");
		this.load.script('webfont', 'js/webfont.js');
	},
	
	create: function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.sound.mute = Adventure.getMuteState();
	}
};
