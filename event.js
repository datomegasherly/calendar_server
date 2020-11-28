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
                if(err) throw err;
                else {
                    data = JSON.parse(data);
                    res.json(data);
                }
            });
        });
        this.on('callCreateFile', (res, q) => {
            fs.readFile('data.json', (err, data) => {
                let parseData = JSON.parse(data);
                if(!parseData[q.full]){
                    parseData[q.full] = [];
                }
                parseData[q.full].push(q);
                fs.writeFile('data.json', JSON.stringify(parseData), err => {
                    if(err) res.json({success: false});
                    else res.json({success: true});
                });
            });
        });
    }
}

const emitter = new Emitter();

module.exports = emitter;