// Imports
import mongoose from 'mongoose';





// Check connection
let isConnected = false;





// DB connection
export const connectToDb = async () => {
    mongoose.set('strictQuery', true);
    if(!process.env.MONGO_URL) return console.log('MONGO_URL not found');
    if(isConnected) return console.log('Already connected to MongoDb');

    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected = true;
        console.log('Connected to MongoDb');
    } catch (err) {
        console.log(err);
    }
};