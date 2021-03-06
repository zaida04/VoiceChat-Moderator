import Stream from "./Stream";

class Connection {
    _guild: any;
    _guildConnection: any;
    _voiceConnection: any;
    _member: { id: string };
    _channel: any;
    _stream: any;
    _connection: any;
    constructor(data: { guild: any; guildConnection: any; connection: any; member: { id: string }; channel: any }) {
        this._guild = data.guild;
        this._guildConnection = data.guildConnection;
        this._voiceConnection = data.connection;
        this._member = data.member;
        this._channel = data.channel;
        this._stream = new Stream(this, data.member.id).init();
    }
    get guild() {
        return this._guild;
    }
    get channel() {
        return this._channel;
    }
    get voiceConnection() {
        return this._voiceConnection;
    }
    get guildConnection() {
        return this._guildConnection;
    }
    get connection() {
        return this._connection;
    }
    get member() {
        return this._member;
    }
    get stream() {
        return this._stream;
    }
}

export default Connection;
