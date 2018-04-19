const Packet = require('../Network/Packet');

class PingMessage {
    static factory() {
        return new Packet(Packet.TYPE.PING, []);
    }
}

module.exports = PingMessage;