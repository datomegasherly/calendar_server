const { db } = require('./config');
const Joi = require('joi');

const validate = (q) => {
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
        }),
        color: Joi.string().min(1).max(31).required(),
    });
    return schema.validate(q);
}

const get = (req, res) => {
    let { year, month, startDay, endDay } = req.params;
    if(startDay && endDay &&
       startDay <= endDay &&
       startDay > 0 && endDay > 0 && startDay <= 31 && endDay <= 31 &&
       !isNaN(Number(startDay)) & !isNaN(Number(endDay))){
           let inDays = [];
           for(let i=startDay;i<=endDay;i++){
               inDays.push(i.toString());
           }
        db.getData('calendar', {query: {year, month, day: {$in: inDays}}});
    } else {
        db.getData('calendar', {query: {year, month}});
    }
    db.response((data) => {
        res.json(data);
    });
}

const create = (req, res) => {
    let data = req.body;
    data.start_time = JSON.parse(data.start_time);
    data.end_time = JSON.parse(data.end_time);
    const checkValidate = validate(data);
    if(checkValidate.error){
        res.json({error: checkValidate.error.details[0].message});
        return;
    }
    db.createData('calendar', data);
    db.response(() => {
        res.json({success: true});
    });
}

const update = (req, res) => {
    let data = req.body;
    data.start_time = JSON.parse(data.start_time);
    data.end_time = JSON.parse(data.end_time);
    const checkValidate = validate(data);
    if(checkValidate.error){
        res.json({error: checkValidate.error.details[0].message});
        return;
    }
    db.updateData('calendar', data, { query: { id: data.id } });
    db.response(() => {
        res.json({success: true});
    });
}

const remove = (req, res) => {
    let { full, id } = req.params;
    db.deleteData('calendar', {query: { id, full }})
    db.response(() => {
        res.json({success: true});
    })
}

module.exports = {
    get,
    create,
    update,
    remove
}