const { EventEmitter } = require('events');
const fs = require('fs');

class Emitter extends EventEmitter {
    constructor(){
        super();
        this.callEvents();
    }
    callEvents(){
        this.on('callReadFile', res => {
            fs.readFile('data.json', (err, data) => {
                if(err) console.log(err);
                else {
                    res.write(data);
                }
                res.end();
            });
        });
    }
}

const emitter = new Emitter();

module.exports = emitter;