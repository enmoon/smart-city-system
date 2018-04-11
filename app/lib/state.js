const EventEmitter = require('events').EventEmitter;

class State extends EventEmitter {
    constructor(options) {
        super(options);

        this.state = {
            fire: false,
            water: false,
            animation: 32
        }
    }

    get(name) {
        return name ? this.state[name] : this.state;
    }


    set(name, value) {

        if (this.state[name] !== undefined) {
            this.state[name] = value;
            this.emit([name, '|', value].join(''), name, value);
        }

        return this.state;
    }

    setStatus(name, value) {
        const val = value.toString() === 'true';

        if (this.state[name] !== undefined) {
            this.state[name] = val;
            this.emit([name, '|', value].join(''), name, val);
        }

        return this.state;
    }


}

module.exports = State;