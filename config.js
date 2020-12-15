const baseUrl = '/calendar'; // set this variable to '' if use / as base url
const DB = require('magic-mongodb');

const db = DB({dbName: 'calendar', collections: ['calendar']});

module.exports = {
    baseUrl,
    db
};