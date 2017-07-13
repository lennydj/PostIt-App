import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import route from './server/routes/';


// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;
// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('./sever/routes', route);
require('./server/routes')(app);
// default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to PostIt!',
}));

console.log('Server running on port', port);

module.exports = app;
