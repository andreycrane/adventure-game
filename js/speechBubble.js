'use strict';

var Adventure = Adventure || {};

Adventure.SpeechBubble = function(state, x, y, text) {
	this.text = new Phaser.Text(
		state.game,
		0,
		0,
		text,
		{
			font: '10px Press Start 2P',
			fill: 'black',
			wordWrap: true
		}
	);
	
	this.graphics = state.game.add.graphics(x, y);
	
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
	
	this.text.setTextBounds((x - Math.abs(xLeft)) + 4, (y - Math.abs(yTop)) + 3);
	state.game.add.existing(this.text);
};
