const Packet = require('../Network/Packet');
const BufferWriter = require('../Network/BufferWriter');

class NicknameMessage {
    static factory(nickname) {
        const nicknameBuffer = Buffer.from(nickname, 'utf8');
        const message = Buffer.allocUnsafe(8 + nicknameBuffer.length);

        BufferWriter.from(message)
            .writeUInt32(0)
            .writeString(nicknameBuffer);

        return new Packet(Packet.TYPE.NICKNAME, message);
    }
}

module.exports = NicknameMessage;