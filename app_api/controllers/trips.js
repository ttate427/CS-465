const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();

    return res.status(200).json(trips);
  } catch (err) {
    console.error('Error retrieving trips:', err);

    return res.status(500).json({
      message: 'Unable to retrieve trips.',
      error: err.message
    });
  }
};

const tripsFindByCode = async (req, res) => {
  const tripCode = req.params.tripCode;

  if (!tripCode) {
    return res.status(400).json({
      message: 'A trip code is required.'
    });
  }

  try {
    const trip = await Trip.findOne({
      code: tripCode
    }).exec();

    if (!trip) {
      return res.status(404).json({
        message: `No trip was found with the code ${tripCode}.`
      });
    }

    return res.status(200).json(trip);
  } catch (err) {
    console.error('Error retrieving trip:', err);

    return res.status(500).json({
      message: 'Unable to retrieve the requested trip.',
      error: err.message
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};