'use strict';
var net = require('net');
var port = 8080;
var server = net.createServer(function (socket) {
	console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);

	// Add a 'data' event handler to this instance of socket
	socket.on('data', function (data) {

		console.log("" + data);
		// Write the data back to the socket, the client will receive it as data from the server
		//socket.write('You said "' + data + '"');

	});

	// Add a 'close' event handler to this instance of socket
	socket.on('close', function (data) {
		console.log('CLOSED: ' + socket.remoteAddress + ' ' + socket.remotePort);
	});

	setInterval(function () {
		var data = new Buffer([128, 2, 3, 4, 5, 6, 7, 8]);
		socket.write(data, 'binary');
	}, 40);
	//ToDo frecuencia de muestreo a 1000 mps paquetes cada ~40ms
	//1 muestra son 32 byte => 8 enteros (1 entero por cada canal)
	//montar la señal con componente de 60hz para probar el filtro notch
	//submuestrear la señal
});

server.listen(port);