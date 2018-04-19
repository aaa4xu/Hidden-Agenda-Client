const dgram = require('dgram');
const Packet = require('./Network/Packet');
const HandshakeMessage = require('./Messages/HandshakeMessage');
const NicknameMessage = require('./Messages/NicknameMessage');
const UpdateMessage = require('./Messages/UpdateMessage');
const PingMessage = require('./Messages/PingMessage');

const PS4_HANDSHAKE_PORT = 8890;
const PS4_CLIENT_BASE_PORT = 8891;

if(process.argv.length < 6) {
    console.error('node client.js localIp ps4ip nickname color[0-5]');
    return process.exit(1);
}

const client = dgram.createSocket('udp4');
const server = dgram.createSocket('udp4');

const sessionId = (Math.random().toString(16).substring(2, 12) + Math.random().toString(36).substring(2, 12)).toLocaleUpperCase();
const [,,localAddress, ps4address, nickname, colorStr] = process.argv;
const color = parseInt(colorStr, 10);
const ps4clientPort = PS4_CLIENT_BASE_PORT + color;

const start = (address, port, nickname) => {
    NicknameMessage.factory(nickname).send(client, address, port);

    const startTime = Date.now();
    setInterval(() => {
        UpdateMessage.factory(Date.now() - startTime).send(client, address, port);
    }, 50);
};

server.on('listening', () => {
    HandshakeMessage.factory(sessionId, nickname, color).send(client, ps4address, PS4_HANDSHAKE_PORT);
});

server.on('message', (packet, rinfo) => {
    packet = Packet.from(packet);

    if(packet.type === Packet.TYPE.WELCOME) {
        // console.log('Welcome packet');
        return start(ps4address, ps4clientPort, nickname);
    }

    if(packet.type === Packet.TYPE.PING) {
        // console.log('Ping packet');
        return PingMessage.factory().send(client, ps4address, ps4clientPort);
    }

    if(packet.type === Packet.TYPE.TEXT_UPDATE) {
        // console.log('Onscreen text update?');
        // @TODO
        return;
    }

    console.log(`[${new Date}] Unknown message from ${rinfo.address}:${rinfo.port}:`, packet.toJSON());
});

server.bind(PS4_HANDSHAKE_PORT, localAddress);
client.bind(PS4_CLIENT_BASE_PORT, localAddress);