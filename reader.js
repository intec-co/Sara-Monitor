var WebSocket = require('ws');
var host = 'localhost';
var counter = 0;
var angle=0;
var angle2=0;

var aux = 0;

var ws = new WebSocket('ws://' + host + ':8081');
var fs = require('fs');
//var wstream = fs.createWriteStream('c:\\users\\german\\desktop\\myOutput.txt');

ws.on('open', function sendSignalData() {
    var interval=setInterval(function () {
        var msg = {counter: counter, action: 'data'};
        ws.send(JSON.stringify(msg));
        angle+=21;
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
});