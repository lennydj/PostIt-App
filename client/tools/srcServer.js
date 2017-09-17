import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import bodyParser from 'webpack-body-parser';
import config from '../webpack.config.dev';


const port = 3000;
const app = express();
const compiler = webpack(config);

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
    // console.log('App is running');
  }
});
