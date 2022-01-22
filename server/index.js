// It is a code to run the express server for request handling at
// the client side

const express = require('express');
const minimist = require('minimist')
const { resolve } = require('path');
const apply_middleware = require('./middlewares/frontendMiddleware');

//check if port is written in command line and parse it using minimist OR written in script using cross-env OR default is 3000
const port = minimist(process.argv.slice(2)).port || process.env.PORT || 3000;

const app = express(); //initializa an express function

apply_middleware(app, {
    outputPath: resolve(process.cwd(), 'build'),
    publicPath: '/',
  });

app.get('/', (req, res) => {
    res.send('testing');
  });

app.listen(port);
//Now we are going to add some middlewares to our server



