const fs = require('fs');

const home = (req, res) => {
    res.render('index', {
        title: 'Travlr Express'
    });
};

const travel = (req, res) => {
    const trips = JSON.parse(
        fs.readFileSync('./data/trips.json', 'utf8')
    );

    res.render('travel', {
        title: 'Travlr Getaways',
        trips,
        layout: false
    });
};

module.exports = {
    home,
    travel
};
