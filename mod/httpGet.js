'use strict';
var path = require("path");
var filesys = require("fs");
var minify = require('minify');
var zlib = require('zlib');
var gzipOpt = {level: 9};

/*
 * TODO read file from disk and return on response??? use chache linux have
 */
var responseFile = function (full_path, response, opt) {
	var comp = full_path.split('.');
	var len = comp.length;
	var ext = comp.pop();
	var toMinify = true;
	var toCompress = true;
	if (opt !== undefined) {
		if (opt.minify !== undefined)
			toMinify = opt.minify;
		else

		if (opt.compress !== undefined)
			toCompress = opt.compress;
	}
	if (comp[len - 2] === "min")
		toMinify = false;
	var textType = "text/" + ext;
	if (textType === 'text/js') {
		textType = 'application/javascript';
	} else if (textType === 'text/pdf') {
		textType = 'application/pdf';
	} else if (textType === 'text/woff' || textType === 'text/woff2' || textType === 'text/ttf') {
		textType = 'font/opentype';
	} else if (ext === 'png' || ext === 'jpeg' || ext === 'jpg' || ext === 'gif') {
		textType = 'image/' + ext;
	}
	if (toMinify && (ext === "js" || ext === "css" || ext === "html")) {
		minify(full_path, function (error, data) {
			if (error) {
				console.error(error);
				response.writeHeader(500, {"Content-Type": textType, Server: "SARA v2"});
				response.write("error 500");
				response.end();
			} else {
				if (toCompress) {
					response.writeHeader(200, {
						Server: "SARA v2",
						'content-encoding': 'gzip'});
					zlib.gzip(data, gzipOpt, function (_, result) {
						response.writeHeader(200, {
							"Content-Type": textType,
							Server: "SARA v2",
							'content-encoding': 'gzip'});
						response.end(result);
					});
				} else {
					response.writeHeader(200, {
						Server: "SARA v2"});
					response.write(data, 'utf8');
					response.end();
				}
			}
		});
	} else {
		var file = filesys.createReadStream(full_path);
		if (toCompress) {
			response.writeHeader(200, {
				"Content-Type": textType,
				Server: "SARA v2",
				'content-encoding': 'gzip'});
			file.pipe(zlib.createGzip(gzipOpt)).pipe(response);
		} else {
			response.writeHeader(200, {
				"Content-Type": textType,
				Server: "SARA v2"});
			file.pipe(response);
		}
	}
};

var resFiles = function (pathName, response, opt) {
	var full_path = "";
	var isFile = pathName.indexOf('.');
	if (isFile > 0) {
		var full_path = path.join(process.cwd(), "public",pathName);
		filesys.stat(full_path, function (err, stats) {
			if (err) {
				response.writeHead(404, {"Content-Type": "text/plain"});
				response.write("SARA\n404 Archivo no encontrado\n");
				response.end();
			} else
				responseFile(full_path, response, opt);
		});

	} else {
		pathName = '/index.html';
		full_path = path.join(process.cwd(), 'public');
		full_path = path.join(full_path, pathName);
		responseFile(full_path, response, opt);
	}
};

module.exports = function (response, pathComp, opt) {
	var pathString = "/" + pathComp.join("/");
	resFiles(pathString, response, opt);
};
