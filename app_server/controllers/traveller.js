const home = (req, res) => {
    res.render('index', {
        title: 'Travlr Express'
    });
};

module.exports = {
    home
};