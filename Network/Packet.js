class Packet {
    static get TYPE() {
        return {
            PING: 1001,
            WELCOME: 1003,
            UPDATE: 2000,
            TEXT_UPDATE: 2003,
            NICKNAME: 2008,
            UNK1: 2009, // current display message, language (and mb, players cursor position)
        }
    }
    /**
     *
     * @param {Buffer} packet
     * @return {Packet}
     */
    static from(packet) {
        const type = packet.readUInt32LE(0);
        const length = packet.readUInt32LE(4);
        const message = packet.slice(8);

        if(message.length + 8 !== length) {
            throw new Error(`Packet size error: Expected=${length} Current=${message.length + 8}`);
        }

        return new this(type, message);
    }

    constructor(type = 0, message = []) {
        this.type = type;
        this.setMessage(message);
    }

    get length() {
        return 4 + 4 + this.message.length;
    }

    setMessage(message) {
        if(!(message instanceof Buffer)) {
            message = Buffer.from(message);
        }

        this.message = message;
    }

    toBuffer() {
        const buffer = Buffer.allocUnsafe(this.length);
        buffer.writeUInt32LE(this.type, 0);
        buffer.writeUInt32LE(this.length, 4);
        this.message.copy(buffer, 8);
        return buffer;
    }

    toString(encoding = 'hex') {
        return this.toBuffer().toString(encoding);
    }

    toJSON() {
        return {
            type: this.type,
            size: this.message.length,
            messageUTF8: this.message.toString(),
            messageHex: this.message.toString('hex'),
        };
    }

    send(socket, address, port) {
        return new Promise((resolve, reject) => {
            socket.send(this.toBuffer(), port, address, err => err ? reject(err) : resolve());
        });
    }
}

module.exports = Packet;