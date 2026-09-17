const http = require('http');
const router = require('./core/routes/router');

const server = http.createServer((req, res) => {
	//Starting router
	if (router(req,res)) return;
	}
);

server.listen(
    process.env.PORT || 3000,
    "0.0.0.0",
    () => {
        console.log("Server running");
    }
);