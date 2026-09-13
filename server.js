const http = require('http');
const fs = require('fs');

function sendJson(res,s,c) {
	res.writeHead(c,{'Content-Type':'application/json'});
	res.end(JSON.stringify(s));
	}
	
const server = http.createServer((req, res) => {
	res.end(process.env.arman);
	return;
	}
);

server.listen(3001,() => {
	console.log('server running...');
	});