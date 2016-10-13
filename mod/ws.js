/**
 * Web socket funcitonality
 */
'use strict';
var WebSocketServer = require('ws').Server;
var wss;
var wsConnection;
var counter = 100;
var reader;
var viewer;

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
                case 'register':
                    if (message.type == 'reader') {
                        reader = ws;
                    } else if (message.type == 'viewer') {
                        viewer = ws;
                    }
                    break;
                case 'data':
                    if(viewer!==undefined){
                        viewer.send(message);
                    }

                    break;
            }
        });
    });
};