const http = require('http');
const router = require('./core/routes/router');
const port = process.env.PORT || 3000;

	
const server = http.createServer((req, res) => {
	//Starting router
	if (router(req,res)) return;
	}
);

server.listen(port,() => {
	console.log('server running on port ' + port);
	});