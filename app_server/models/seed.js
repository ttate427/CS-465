const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

require('./db');

const Trip = require('./travlr');

const seedDatabase = async () => {
    try {
        const dataPath = path.join(__dirname, '../../data/trips.json');
        const tripData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        await Trip.deleteMany({});

        const insertedTrips = await Trip.insertMany(tripData);

        console.log(`Database successfully seeded with ${insertedTrips.length} trips.`);
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

mongoose.connection.once('open', seedDatabase);