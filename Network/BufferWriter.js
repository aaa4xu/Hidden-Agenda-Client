class BufferWriter {
    /**
     *
     * @param {Buffer} buffer
     * @return {BufferWriter}
     */
    static from(buffer) {
        return new this(buffer);
    }

    constructor(buffer, offset = 0) {
        this.buffer = buffer;
        this.offset = 0;
    }

    /**
     *
     * @return {Buffer}
     */
    getBuffer() {
        return this.buffer;
    }

    /**
     *
     * @return {number}
     */
    getOffset() {
        return this.offset;
    }

    /**
     *
     * @param {Buffer} buffer
     * @return {BufferWriter}
     */
    copy(buffer) {
        buffer.copy(this.buffer, this.offset);
        this.offset += buffer.length;
        return this;
    }

    /**
     *
     * @param {number} value
     * @return {BufferWriter}
     */
    writeByte(value) {
        this.buffer[this.offset++] = value;
        return this;
    }

    /**
     *
     * @param {number} value
     * @return {BufferWriter}
     */
    writeUInt32(value) {
        this.buffer.writeUInt32LE(value, this.offset);
        this.offset += 4;
        return this;
    }

    /**
     *
     * @param {string|Buffer} value
     * @return {BufferWriter}
     */
    writeString(value) {
        if(typeof value === 'string') {
            value = Buffer.from(value, 'utf8');
        }

        return this.writeUInt32(value.length).copy(value);
    }
}

module.exports = BufferWriter;