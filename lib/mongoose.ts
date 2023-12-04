// Imports
import mongoose from 'mongoose';





// Check connection
let isConnected = false;





// DB connection
export const connectToDb = async (dbName:String) => {
    mongoose.set('strictQuery', true);


    // Selected Database
    var mongo_url;
    switch (dbName) {
        case 'accounts':
            mongo_url = process.env.MONGO_ACCOUNTS_URL;
            break;
        case 'admission':
            mongo_url = process.env.MONGO_ADMISSION_URL;
            break;
        case 'fees':
            mongo_url = process.env.MONGO_ACCOUNTS_URL;
            break;
        case 'payroll':
            mongo_url = process.env.MONGO_ACCOUNTS_URL;
            break;
        case 'stocks':
            mongo_url = process.env.MONGO_ACCOUNTS_URL;
            break;
        case 'users':
            mongo_url = process.env.MONGO_ACCOUNTS_URL;
            break;
        case 'attendance':
            mongo_url = process.env.MONGO_ACCOUNTS_URL;
            break;
        case 'timetable':
            mongo_url = process.env.MONGO_ACCOUNTS_URL;
            break;
        case 'report':
            mongo_url = process.env.MONGO_ACCOUNTS_URL;
            break;
        case 'library':
            mongo_url = process.env.MONGO_ACCOUNTS_URL;
            break;
        case 'cbse':
            mongo_url = process.env.MONGO_ACCOUNTS_URL;
            break;
    };


    if(!mongo_url) return console.log('MONGO_URL not found');
    if(isConnected) return console.log('Already connected to MongoDb');

    try {
        await mongoose.connect(mongo_url);
        isConnected = true;
        console.log('Connected to MongoDb');
    } catch (err) {
        console.log(err);
    }
};