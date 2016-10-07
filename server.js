'use strict';
var port = 8081;
var http = require('http');
var url = require("url");
var httpGet = require('./mod/httpGet');
var ws = require("./mod/ws");

var server = http.createServer(function (request, response) {
	var pathName = url.parse(request.url).pathname;
	var pathComp = pathName.split('/');

	if (request.method === 'POST') {
		console.log("petición por post");
		var data = '';
		request.on('data', function (chunk) {
			data += chunk.toString();
		});
		request.on('end', function () {
			console.log(data);
			response.writeHead(200, {'Content-Type': 'text/json'});
			response.write("JSON.stringify(obj)");
			response.end();
		});

	} else if (request.method === 'GET') {
		var pathSize = pathComp.length;
		var isFile = pathComp[pathSize - 1].indexOf('.');
		if (pathComp === 0, pathComp[pathSize - 1].length > 0 && isFile === -1) {
			response.statusCode = 302;
			response.setHeader('Location', request.url + "/");
			response.end();
		} else
			httpGet(response, pathComp, {compress: false, minify: false});
	}
});
server.listen(port, function () {
	console.log('Running server 1.0 in port:', port);
	console.log(new Date);
	ws(server);
});
