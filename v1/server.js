var http = require('http'),
	fs = require('fs'),
	URL = require('url'),
	query = require('');

http.createServer(function(req,res) {

	var args = URL.parse(req.url,true).query;
	var opt = args.opt;
	console.log(opt);
	//console.log(args.time);
	res.writeHead(200 , {'Content-Type': 'text/json', 'Access-Control-Allow-Origin': '*'});

	if(opt == 'getData') {
		jsonData = fs.readFileSync('./js/data.json');
		res.end(jsonData);
	}else if(opt == 'setData') {
		var postData = '';
		req.addListener('data',function(postDataChunk) {
			postData += postDataChunk;
			console.log(postDataChunk + '\n');
		});
		req.addListener('end',function() {

			var params = query.parse(postData);



			res.end("{\"result\": " + params + "}");
		});
		
	}

	

	//res.end("{\"test\": \"123\"}");
}).listen(2015);

console.log('Server running at localhost:2015/');

/*var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Nodejs\n');
}).listen(1338, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1338/');*/