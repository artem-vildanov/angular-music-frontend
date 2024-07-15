/// <reference lib="webworker" />
declare var self: Window & typeof globalThis;

const connections: MessagePort[] = [];
const handleMessage = (message: any) => {
    connections.forEach(connection => connection.postMessage('songs list changed'));
}
const handleConnect = (connectEvent: any) => {
    const port = connectEvent.ports[0];
    connections.push(port);
    port.addEventListener('message', handleMessage);
    port.start();
}
self.addEventListener('connect', handleConnect);
