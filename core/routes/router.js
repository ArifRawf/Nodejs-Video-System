const fs = require("fs");
const path = require("path");
const videoPath = path.join(process.cwd(),"video","song.mp4");
module.exports = (req, res) => {
	
	if (req.url === '/' || req.url === '/index.html') {
		
		fs.readFile(path.join(process.cwd(),'public','html','index.html'),'utf8',(err,data) => {
			if(err) {
				res.writeHead(500, {'Content-Type':'text/plain'});
				res.end('error server side');
				return;
				}
				res.writeHead(200, {'Content-Type':'text/html'});
		res.end(data);
    });
    return true;
    }
     
	
	if (req.url === '/css/style.css') {
		fs.readFile(path.join(process.cwd(),'public','css','style.css'),'utf8',(err,data) => {
			if(err) {
				res.writeHead(500, {'Content-Type':'text/plain'});
				res.end('error server side');
				return;
				}
				res.writeHead(200, {'Content-Type':'text/css'});
		res.end(data);
    });
    return true;
    }
	
	if (req.url === '/video.html') {
		fs.readFile(path.join(process.cwd(),'public','html','video.html'),'utf8',(err,data) => {
			if(err) {
				res.writeHead(500, {'Content-Type':'text/plain'});
				res.end('error server side');
				return;
				}
				res.writeHead(200, {'Content-Type':'text/html'});
		res.end(data);
    });
    return true;
    }
	
	
	
	
     if (req.url === '/video/song.mp4') {
 const fileSize = fs.statSync(videoPath).size;
        
        const range = req.headers.range;
console.log(range);
        if (range) {

            const [startStr, endStr] =
                range.replace("bytes=", "").split("-");

            const start = Number(startStr);

            const end = endStr
                ? Number(endStr)
                : fileSize - 1;

            const chunkSize = end - start + 1;

            console.log("Start:", start);
            console.log("End:", end);

            res.writeHead(206, {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": "video/mp4"
            });

            const stream = fs.createReadStream(videoPath, {
                start: start,
                end: end
            });

            stream.on("data", (chunk) => {
                res.write(chunk);
            });

            stream.on("end", () => {
                res.end();
            });

            return true;
        }

        // যদি Range না থাকে
        res.writeHead(200, {
            "Content-Type": "video/mp4",
            "Content-Length": fileSize
        });

        const stream = fs.createReadStream(videoPath);

        stream.on("data", (chunk) => {
            res.write(chunk);
        });

        stream.on("end", () => {
            res.end();
        });

        return true;
    }
};