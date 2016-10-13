var WebSocket = require('ws');
var host = 'localhost';
var counter = 100;

var ws = new WebSocket('ws://' + host + ':8081');
ws.on('open',function algo() {
    //ws.send();//registro
    setInterval(function () {
        var msg = {counter: counter, action: 'data'};
        ws.send(JSON.stringify(msg));
        counter -= 2;
        if (counter === 0)
            counter = 100;
    }, 10);
});
		