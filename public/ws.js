var host = window.document.location.host.replace(/:.*/, '');
var ws = new WebSocket('ws://' + host + ':8080');
ws.onmessage = function (event) {
	updateStats(JSON.parse(event.data));
};