const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const sequelize = require('./sequelize');

const app = express(feathers());

const authentication = require('./authentication');

// const prometheusClient = require('prom-client');
// const apiMetrics = require('prometheus-api-metrics');
// const gcStats = require('prometheus-gc-stats');

// const collectDefaultMetrics = prometheusClient.collectDefaultMetrics;

// Probe every 5th second.
// collectDefaultMetrics({ timeout: 5000 });
// const Registry = prometheusClient.Registry;
// const register = new Registry();

// collectDefaultMetrics({ register });
// prometheusClient.collectDefaultMetrics();
// const startGcStats = gcStats(prometheusClient.register);
// startGcStats();

// Load app configuration
app.configure(configuration());

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));
// app.use(apiMetrics());

//prometheus metrics
// app.get('/metrics', (req, res) => {
//   res.set('Content-Type', register.contentType);
//   res.end(register.metrics());
// });

// Set up Plugins and providers
app.configure(express.rest());
// app.configure(socketio());

app.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);
// app.configure(utils);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());

app.hooks(appHooks);


module.exports = app;
