import mongoose from 'mongoose';

export const initDatabase = () => {
    const DB_CONNECTION_STRING = process.env.CONNECTION_STRING;

    mongoose.connect(DB_CONNECTION_STRING);
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to', DB_CONNECTION_STRING);
    });
    mongoose.connection.on('error', (err) => {
        console.log('Mongoose connection error:', err);
    });
};