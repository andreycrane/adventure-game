'use strict';

const 
	http = require('http'),
	fs = require('fs'),
	path = require('path');

http.createServer((req, res) => {
	let filePath = '.' + req.url;
	
	if ( filePath == './' && process.env.NODE_ENV === 'development') {
		filePath = './index.html';
	} else if (filePath == './' && process.env.NODE_ENV === 'production') {
		filePath = './index.html.production';
	}
	
	const extname = path.extname(filePath);
	let contentType = 'text/html';
	
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
		case '.wav':
			contentType = 'audio/wav';
			break;
	}
	
	fs.readFile(filePath, (error, content) => {
		if (error) {
			if(error.code == 'ENOENT'){
				fs.readFile('./404.html', (error, content) => {
					res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });
					res.end(content, 'utf-8');
				});
			} else {
				res.writeHead(500);
				res.end(`Sorry, check with the site admin for error: ${error.code}`);
				res.end(); 
			}
		} else {
			res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });
			res.end(content, 'utf-8');
		}
	});
}).listen(process.env.PORT || 8000);
