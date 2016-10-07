/**
 * Web socket funcitonality
 */
'use strict';
var WebSocketServer = require('ws').Server;
var wss;
var wsConnection;
var counter = 100;

module.exports = function (server) {
    wss = new WebSocketServer({server: server});
    console.log('running websockets');

    wss.broadcast = function (data) {
        wss.clients.forEach(function (client) {
            client.send(data);
        });
    };

    wss.on('connection', function (ws) {
        wsConnection = ws;
        ws.on('close', function () {
            //ToDo delete chatRoom[obj.id];
        });
        ws.on('message', function (message) {
            var iMsg = JSON.parse(message);
            switch (iMsg.action)
            {
            }
        });
        setInterval(function () {
            var msg = {counter: counter};
            ws.send(JSON.stringify(msg));
            counter -= 2;
            if (counter === 0)
                counter = 100;
        }, 10);
    });
};