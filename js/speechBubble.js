'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.SpeechBubble = function(state, text, x, y) {
	this.text = new Phaser.Text(
		state.game,
		0,
		0,
		text,
		{
			font: '10px Press Start 2P',
			fill: 'black',
			wordWrap: true,
			wordWrapWidth: 300
		}
	);
	
	this.graphics = state.game.add.graphics(x || 0, y || 0);
	
	state.game.add.existing(this.text);
	
	this.text.alpha = 0;
	this.graphics.alpha = 0;
	this.shown = false;
	
	this.speechTween = state.game.add.tween(this.graphics)
						.to({ alpha: 1 }, 10000, Phaser.Easing.Linear.None)
						.to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None);
	
	this.textTween = state.game.add.tween(this.text)
						.to({ alpha: 1 }, 10000, Phaser.Easing.Linear.None)
						.to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None);
};

Adventure.SpeechBubble.prototype.hideTextTween = function(cb) {
	var me = this;
	
	this.speechTween.onComplete.add(function() {
		me.shown = false;
		
		cb && cb();
	});
	
	this.speechTween.start();
	this.textTween.start();
};


Adventure.SpeechBubble.prototype.showText = function(text, x, y) {
	this.shown = true;
	this.text.setText(text);
	
	this.graphics.x = x || this.graphics.x;
	this.graphics.y = y || this.graphics.y;
	
	var
		tW = this.text.width,
		tH = this.text.height,
		
		tailYbottom = 0,
		tailYtop = -5,
		
		tailXleft = -5,
		tailXright = 0,
		
		xLeft = (-tW / 2) + tailYtop,
		xRight = (tW / 2),
		yBottom = tailYtop,
		yTop = (yBottom - tH);
	
	this.speechBubblePolygon = new Phaser.Polygon([
		tailXright,
		tailYbottom,
		
		tailXleft,
		yBottom,
		
		xLeft,
		yBottom,
		
		xLeft,
		yTop,
		
		xRight,
		yTop,
		
		xRight,
		yBottom,
		
		tailXright,
		tailYtop,
		
		tailXright,
		tailYbottom
	]);
	
	this.graphics.lineStyle(2, 0x000000);
	this.graphics.beginFill(0xffffff);
	this.graphics.drawPolygon(this.speechBubblePolygon);
	this.graphics.endFill();
	
	this.text.setTextBounds(
		(this.graphics.x- Math.abs(xLeft)) + 4,
		(this.graphics.y - Math.abs(yTop)) + 3
	);
	
	this.text.alpha = 1;
	this.graphics.alpha = 1;
};


Adventure.SpeechBubble.prototype.hideText = function() {
	this.text.alpha = 0;
	this.graphics.alpha = 0;
	this.shown = false;
};
