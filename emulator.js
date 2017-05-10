'use strict';
var net = require('net');
var port = 8085;

console.log("Runing emulator in port ", port);

var aux;
var counter = 0;
var a1 = 0;
var a2 = 0;
var a0 = 0;

var server = net.createServer(function (socket) {
    console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);
    aux=0;
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

    var interval = setInterval(function () {
        
        var signal1 = getSinSignal(a0);
        var signal2 = getNoisySinSignal(a1, a2);
        
        a0 = signal1[1];
        a1 = signal2[1];
        a2 = signal2[2];

        var val0 = 200;
        var val1 = getRandSignal(50,128);
        var val2 = signal1[0];
        var val3 = signal2[0];
        var val4 = 0;
        var val5 = 50+getRandSignal(0,1) * 50;
        var val6 = 128;
        var val7 = aux % 10 ? 100 : 50;
       
        
        var data = new Buffer([val0,val1, val2, val3, val4, val5, val6, val7]);
        socket.write(data, 'binary');

        aux++;

        if (aux >= 10000) {
            clearInterval(interval);
        }

    }, 40);
    //ToDo frecuencia de muestreo a 1000 mps paquetes cada ~40ms
    //1 muestra son 32 bytes => 8 enteros (1 entero por cada canal)
    //montar la señal con componente de 60hz para probar el filtro notch
    //submuestrear la señal
});

function getRandSignal(limInf,limSup) {
    return limInf+Math.round((limSup-limInf) * Math.random());
}

function getSinSignal(angle) {
    angle += 21;
    var val = 70 + Math.sin(angle * (Math.PI / 180)) * 30;

    var values = new Array();
    values[0] = val;
    values[1] = angle;
    
    return values;
}

function getNoisySinSignal(angle1, angle2) {
    angle1 += 21;
    var val = 70 + Math.sin(angle1 * (Math.PI / 180)) * 30;

    angle2 += 0.36;
    val += 70 + Math.sin(angle2 * (Math.PI / 180)) * 50;

    var values = new Array();
    values[0] = val;
    values[1] = angle1;
    values[2] = angle2;

    return values;
}

server.listen(port);