const express = require('express');
const path = require('path');
const hbs = require('hbs');
const passport = require('passport');

// Connect to MongoDB and load the Mongoose models.
require('./app_api/models/db');

// Configure Passport authentication.
require('./app_api/config/passport');

// Import application routes.
const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');

const app = express();
const port = process.env.PORT || 3000;

// Allow the Angular admin SPA to access the Express API.
app.use((req, res, next) => {
  const angularOrigin = 'http://' + 'localhost:4200';

  res.header('Access-Control-Allow-Origin', angularOrigin);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

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

// Initialize Passport authentication.
app.use(passport.initialize());

// Serve static files.
app.use(express.static(path.join(__dirname, 'public')));

// Customer-facing website routes.
app.use('/', indexRouter);

// REST API routes.
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

// Start Express.
app.listen(port, () => {
  console.log(`Travlr Express running at http://localhost:${port}`);
});

module.exports = app;