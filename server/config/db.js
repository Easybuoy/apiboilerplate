import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose connection


mongoose.connect(`${process.env.DB_URL}`)
.then(() => {
    console.log('Mongodb connected');
}).catch((err) => {
    console.log(err);
})