const index = (req, res) => {
    res.render('index', {
        title: 'Travlr Express'
    });
};

module.exports = {
    index
};