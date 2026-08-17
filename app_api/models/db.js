const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1:27017/travlr';

// Connect to MongoDB
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI), 1000);
};

connect();

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Graceful shutdown
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close().then(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// Nodemon restart
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Application termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

// Heroku/app termination
process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown', () => {
    process.exit(0);
  });
});

// Load Mongoose models
require('./travlr');
require('./user');