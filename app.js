const express = require('express');
const path = require('path');
const hbs = require('hbs');

// Connect to MongoDB and load the Mongoose models.
require('./app_server/models/db');

// Import application routes.
const indexRouter = require('./app_server/routes/index');

const app = express();
const port = process.env.PORT || 3000;

// Set the views folder and Handlebars view engine.
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register the main Handlebars layout.
app.set('view options', {
    layout: 'layouts/layout'
});

// Register the partials folder.
hbs.registerPartials(
    path.join(__dirname, 'app_server', 'views', 'partials')
);

// Allow Express to read JSON and form data.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve images, CSS, and other static files from public.
app.use(express.static(path.join(__dirname, 'public')));

// Use the application routes.
app.use('/', indexRouter);

// Handle pages that do not exist.
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Handle application errors.
app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.status || 500).send(
        'An application error occurred.'
    );
});

// Start the Express server.
app.listen(port, () => {
    console.log(`Travlr Express running at http://localhost:${port}`);
});

module.exports = app;