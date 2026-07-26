const mongoose = require('mongoose');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}:27017/travlr`;

// Connect to MongoDB.
const connect = async () => {
    try {
        await mongoose.connect(dbURI);
    } catch (error) {
        console.error('Initial MongoDB connection error:', error);
    }
};

// Monitor database connection events.
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Close the connection safely when the application stops.
const gracefulShutdown = async (message) => {
    try {
        await mongoose.connection.close();
        console.log(`Mongoose disconnected through ${message}`);
    } catch (error) {
        console.error('Error while closing Mongoose connection:', error);
    }
};

// Restart caused by nodemon.
process.once('SIGUSR2', async () => {
    await gracefulShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});

// Application terminated with Control+C.
process.on('SIGINT', async () => {
    await gracefulShutdown('app termination');
    process.exit(0);
});

// Application terminated by the operating system or container.
process.on('SIGTERM', async () => {
    await gracefulShutdown('app shutdown');
    process.exit(0);
});

// Make the initial database connection.
connect();

// Load the Mongoose trip schema.
require('./travlr');

module.exports = mongoose;