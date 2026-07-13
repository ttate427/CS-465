const home = (req, res) => {
    res.render('index', {
        title: 'Travlr',
        heading: 'Welcome to Travlr',
        message: 'Find your next adventure.'
    });
};

module.exports = {
    home
};