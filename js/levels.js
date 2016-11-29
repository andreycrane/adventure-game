'use strict';

/* globals Phaser */
var Adventure = Adventure || {};

Adventure.maps = [
	{
		name: 'Stage 1. Moscow',
		
		json: {
			cacheName: 'level1',
			path: 'assets/tilemap/level1.json'
		},
		tileset: {
			cacheName: 'tileset1',
			name: 'blocks',
			path: 'assets/img/blocks1.png'
		},
		bg:  {
			cacheName: 'bg1',
			path: 'assets/img/moscow/bg.png'
		},
		mob: {
			cacheName: 'mob1',
			path: 'assets/img/mob1-set.png'
		},
		guard: {
			cacheName: 'guard1',
			path: 'assets/img/pasha-set.png'
		},
		dec1: {
			cacheName: 'dec1-1',
			path: 'assets/img/rostov/decor-1.png'
		},
		dec2: {
			cacheName: 'dec1-2',
			path: 'assets/img/rostov/decor-2.png'
		},
		dec3: {
			cacheName: 'dec1-3',
			path: 'assets/img/rostov/decor-3.png'
		},
		dec4: {
			cacheName: 'dec1-4',
			path: 'assets/img/rostov/decor-4.png'
		}
	},
	{
		name: 'Stage 2. Piter',
		
		json: {
			cacheName: 'level2',
			path: 'assets/tilemap/level1.json'
		},
		tileset: {
			cacheName: 'tiles2',
			name: 'blocks',
			path: 'assets/img/blocks1.png'
		},
		bg:  {
			cacheName: 'bg2',
			path: 'assets/img/piter/bg.png'
		},
		mob: {
			cacheName: 'mob2',
			path: 'assets/img/mob2-set.png'
		},
		guard: {
			cacheName: 'guard1',
			path: 'assets/img/pasha-set.png'
		},
		dec1: {
			cacheName: 'dec2-1',
			path: 'assets/img/rostov/decor-1.png'
		},
		dec2: {
			cacheName: 'dec2-1',
			path: 'assets/img/rostov/decor-2.png'
		},
		dec3: {
			cacheName: 'dec3-3',
			path: 'assets/img/rostov/decor-3.png'
		},
		dec4: {
			cacheName: 'dec4-4',
			path: 'assets/img/rostov/decor-4.png'
		}
	},
	{
		name: 'Stage 3. Rostov-on-Don',
		
		json: {
			cacheName: 'level3',
			path: 'assets/tilemap/level2.json'
		},
		tileset: {
			cacheName: 'tiles2',
			name: 'blocks',
			path: 'assets/img/blocks1.png'
		},
		bg:  {
			cacheName: 'bg2',
			path: 'assets/img/rostov/bg.png'
		},
		mob: {
			cacheName: 'mob3',
			path: 'assets/img/mob3-set.png'
		},
		guard: {
			cacheName: 'guard1',
			path: 'assets/img/pasha-set.png'
		},
		dec1: {
			cacheName: 'dec2-1',
			path: 'assets/img/rostov/decor-1.png'
		},
		dec2: {
			cacheName: 'dec2-1',
			path: 'assets/img/rostov/decor-2.png'
		},
		dec3: {
			cacheName: 'dec3-3',
			path: 'assets/img/rostov/decor-3.png'
		},
		dec4: {
			cacheName: 'dec4-4',
			path: 'assets/img/rostov/decor-4.png'
		}
	},
	{
		name: 'Stage 4. Cherkassy',
		
		json: {
			cacheName: 'level4',
			path: 'assets/tilemap/level3.json'
		},
		tileset: {
			cacheName: 'tiles2',
			name: 'blocks',
			path: 'assets/img/blocks1.png'
		},
		bg:  {
			cacheName: 'bg2',
			path: 'assets/img/cherkassy/bg.png'
		},
		mob: {
			cacheName: 'mob4',
			path: 'assets/img/mob4-set.png'
		},
		guard: {
			cacheName: 'guard1',
			path: 'assets/img/pasha-set.png'
		},
		dec1: {
			cacheName: 'dec4-1',
			path: 'assets/img/cherkassy/decor-1.png'
		},
		dec2: {
			cacheName: 'dec4-2',
			path: 'assets/img/cherkassy/decor-2.png'
		},
		dec3: {
			cacheName: 'dec4-3',
			path: 'assets/img/cherkassy/decor-3.png'
		},
		dec4: {
			cacheName: 'dec4-4',
			path: 'assets/img/cherkassy/decor-4.png'
		}
	}
];

