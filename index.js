const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const calendar = require('./routes/calendar');
const config = require('./routes/config');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use('/api/calendar', calendar);
app.use('/api/config', config);

app.listen(2020, () => {
    console.log('server is listening on port 2020');
});