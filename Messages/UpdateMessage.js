const fs = require('fs');
const Packet = require('../Network/Packet');
const BufferWriter = require('../Network/BufferWriter');

const unk1 = [
    0x00, 0x00, 0x00, 0x00, // Выглядит как время с коннекта (или запуска) приложения
    0x00, 0x00, 0x00, 0x00, // Похоже на флаг нажатия на экран
    0x00, 0x00, 0x00, 0x00, // x
    0x00, 0x00, 0x00, 0x00, // y
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // ???
    0xff, 0xff, 0xff, 0xff // ???
];

let isPushed = 1;
let x = 0;
let y = 0;

setInterval(() => {
    fs.readFile('./position.txt', 'utf8', (err, data) => {
        if(err) return console.error('Read position file error:', err);
        const position = data.split(',');
        x = parseInt(position[0], 10);
        y = parseInt(position[1], 10);
    });
}, 1000);

class UpdateMessage {
    static factory(time) {
        const message = Buffer.from(unk1);

        BufferWriter.from(message)
            .writeUInt32(time)
            .writeUInt32(isPushed)
            .writeUInt32(x)
            .writeUInt32(y);

        const packet = new Packet(Packet.TYPE.UPDATE, message);
        // console.log(`x=${x} y=${y}:`, packet.message.toString('hex'));
        return packet;
    }
}

module.exports = UpdateMessage;