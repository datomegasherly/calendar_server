const { EventEmitter } = require('events');
const fs = require('fs');
const Joi = require('joi');

class CalendarEmitter extends EventEmitter {
    constructor(){
        super();
        this.callEvents();
    }
    validate(q){
        const schema = Joi.object({
            id: Joi.string().min(10).max(40).required(),
            year: Joi.number().min(1000).max(4000).required(),
            month: Joi.number().min(1).max(12).required(),
            day: Joi.number().min(1).max(31).required(),
            full: Joi.string().min(10).max(10).required(),
            event: Joi.string().min(3).max(250).required(),
            start_time: Joi.object({
                hour: Joi.number().min(0).max(23).required(),
                minute: Joi.number().min(0).max(59).required()
            }),
            end_time: Joi.object({
                hour: Joi.number().min(0).max(23).required(),
                minute: Joi.number().min(0).max(59).required()
            })
        });
        return schema.validate(q);
    }
    read(res){
        fs.readFile('data.json', (err, data) => {
            if(err) throw err;
            else {
                data = JSON.parse(data);
                res.json(data);
            }
        });
    }
    create(res, q){
        const checkValidate = this.validate(q);
        if(checkValidate.error){
            res.json({error: checkValidate.error.details[0].message});
            return;
        }
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
    }
    callEvents(){
        this.on('callReadFile', res => this.read(res));
        this.on('callCreateFile', (res, q) => this.create(res, q));
    }
}

const calendarEmitter = new CalendarEmitter();

module.exports = {
    calendarEmitter
};