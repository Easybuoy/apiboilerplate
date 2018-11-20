import express from 'express';
import bodyParser from 'body-parser';

import users from './routes/api/v1/users';

//Db config
require('./config/db');
// const { User } = require('./models/model');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.json('Hi, welcome to WebService');
});

app.use('/api/v1/users', users);   

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
