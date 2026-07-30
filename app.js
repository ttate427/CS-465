const express = require('express');
const path = require('path');
const hbs = require('hbs');

// Connect to MongoDB and load the Mongoose models.
require('./app_api/models/db');

// Import application routes.
const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');

const app = express();
const port = process.env.PORT || 3000;

// Set the views folder and Handlebars view engine.
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register the main Handlebars layout.
app.set('view options', {
layout: 'layouts/layout'
});

// Register the Handlebars partials folder.
hbs.registerPartials(
path.join(__dirname, 'app_server', 'views', 'partials')
);

// Allow Express to read JSON and form data.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve images, CSS, JavaScript, and other static files.
app.use(express.static(path.join(__dirname, 'public')));

// Use the customer-facing website routes.
app.use('/', indexRouter);

// Use the REST API routes.
// Example: http://localhost:3000/api/trips
app.use('/api', apiRouter);

// Handle routes that do not exist.
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
