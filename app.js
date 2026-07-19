const express = require('express');
const path = require('path');
const hbs = require('hbs');

const indexRouter = require('./app_server/routes/index');

const app = express();

app.set('views', path.join(__dirname, 'app_server/views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'app_server/views/partials'));

app.set('view options', {
    layout: 'layouts/layout'
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Travlr Express running at http://localhost:${PORT}`);
});
