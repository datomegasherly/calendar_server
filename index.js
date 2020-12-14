const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const calendar = require('./routes/calendar');
const calendarConfig = require('./routes/config');
const config = require('./config');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.use(`${config.baseUrl}/api/calendar`, calendar);
app.use(`${config.baseUrl}/api/config`, calendarConfig);

app.listen(8001, () => {
    console.log('server is listening on port 8001');
});