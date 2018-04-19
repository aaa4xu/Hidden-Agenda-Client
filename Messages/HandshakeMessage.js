const Packet = require('../Network/Packet');
const BufferWriter = require('../Network/BufferWriter');

class HandshakeMessage {
    static factory(sessionId, nickname, color) {
        const nicknameBuffer = Buffer.from(nickname, 'utf8');
        const sessionIdStrBuffer = Buffer.from(sessionId, 'utf8');
        const sessionIdBuffer = this.sessionIdToBuffer(sessionId);

        const message = Buffer.allocUnsafe(sessionIdBuffer.length + 4 + nicknameBuffer.length + 1 + 4 + sessionIdStrBuffer.length);

        BufferWriter.from(message)
            .copy(sessionIdBuffer)
            .writeString(nicknameBuffer)
            .writeByte(color)
            .writeString(sessionIdStrBuffer);

        return new Packet(1002, message);
    }

    static sessionIdToBuffer(sessionId) {
        const chars = sessionId.split('');
        const buffer = Buffer.allocUnsafe(16);
        for(let number = 0; number < 4; number++) {
            let hex = '';
            for(let offset = 0; offset < 4; offset++) {
                const index = number * 8 + offset * 2;
                hex += chars[index] + chars[index+1];
            }

            buffer.writeUInt32LE(parseInt(hex, 16), number * 4);
        }

        return buffer;
    }
}

module.exports = HandshakeMessage;