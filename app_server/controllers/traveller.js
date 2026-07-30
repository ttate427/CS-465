const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};

const home = (req, res) => {
    res.render('index', {
        title: 'Travlr Express'
    });
};

const travel = (req, res) => {
    const path = '/api/trips';

    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };

    request(requestOptions, (error, response, body) => {
        if (error) {
            console.error('API request error:', error);

            return res.status(500).send(
                'Unable to retrieve trip information.'
            );
        }

        if (response.statusCode !== 200) {
            console.error(
                `API returned status ${response.statusCode}`
            );

            return res.status(response.statusCode).send(
                'Trip information could not be loaded.'
            );
        }

        return res.render('travel', {
            title: 'Travlr Getaways',
            trips: body,
            layout: false
        });
    });
};

module.exports = {
    home,
    travel
};