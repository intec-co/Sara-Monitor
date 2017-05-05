'use strict';
var net = require('net');
var port = 8085;

console.log("Runing emulator in port ", port);

var aux = 0;
var counter = 0;
var angle=0;
var angle2=0;

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

    var interval=setInterval(function () {
        /*var val=Math.round(128*Math.random());
         var data = new Buffer([val, 2, 3, 4, 5, 6, 7, 8]);
         socket.write(data, 'binary');*/

        //var msg = {counter: counter, action: 'data'};
        
        var data = new Buffer([counter, 2, 3, 4, 5, 6, 7, 8]);
        socket.write(data);
        angle += 21;
        counter = 70 + Math.sin(angle * (Math.PI / 180)) * 30;

        angle2 += 0.36;
        counter += 70 + Math.sin(angle2 * (Math.PI / 180)) * 50;

        //wstream.write(counter+',');
        aux++;

        if (aux === 10000) {
            clearInterval(interval);
            //wstream.end();
        }


    }, 1);
    //ToDo frecuencia de muestreo a 1000 mps paquetes cada ~40ms
    //1 muestra son 32 bytes => 8 enteros (1 entero por cada canal)
    //montar la señal con componente de 60hz para probar el filtro notch
    //submuestrear la señal
});

server.listen(port);