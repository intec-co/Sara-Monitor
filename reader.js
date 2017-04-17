'use strict';

var net = require('net');
var WebSocket = require('ws');

var host = 'localhost';
var counter = 0;
var angle = 0;
var angle2 = 0;

var aux = 0;
var buffer = "";

//var ws = new WebSocket('ws://' + host + ':8081');
//var fs = require('fs');

const client = net.createConnection({ port: 8080, host: "localhost" }, () => {
	//'connect' listener
	console.log('connected to server!');
	client.write('world!\r\n');
});
client.on('data', (data) => {
	var array = new Int32Array(data);
	console.log(array[0]);
	//console.log(data.readInt16BE(0, 3));
	//client.end();
});
client.on('end', () => {
	console.log('disconnected from server', buffer);
	buffer = "";
});

//var wstream = fs.createWriteStream('c:\\users\\german\\desktop\\myOutput.txt');

/*ws.on('open', function sendSignalData() {
    var interval=setInterval(function () {
        var msg = {counter: counter, action: 'data'};
        ws.send(JSON.stringify(msg));
        angle+=21.6;
        counter =70+ Math.sin(angle * (Math.PI / 180))*30;
        
        angle2+=0.36;
        counter +=70+ Math.sin(angle2 * (Math.PI / 180))*50;
        
        //wstream.write(counter+',');
        aux++;
        
        if(aux===10000){
            clearInterval(interval);
            //wstream.end();
        }        
    }, 1);
});*/
