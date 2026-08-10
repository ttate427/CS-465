const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1:27017/travlr';

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = async (message) => {
  try {
    await mongoose.connection.close();
    console.log(`Mongoose disconnected through ${message}`);
  } catch (err) {
    console.error('Error closing Mongoose connection:', err);
  }
};

process.on('SIGINT', async () => {
  await gracefulShutdown('app termination');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await gracefulShutdown('app shutdown');
  process.exit(0);
});

require('./travlr');