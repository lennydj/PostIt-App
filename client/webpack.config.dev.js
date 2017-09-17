import webpack from 'webpack';
import path from 'path';

export default {
  // debug: true,
  devtool: 'cheap-module-eval-source-map',
  // noInfo: false, // display the files it is debugging
  entry: [
    'eventsource-polyfill', // For hot reloading with IE
    'webpack-hot-middleware/client?reload=true', // For reloading if the hot module reload fails.
    './src/index'
  ],
  target: 'web', // bundle the code so that a web browser can understand
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js' // Does not write the actual file
  },
  devServer: {
    contentBase: './src/' // This is where the sourcecode is
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Replace module without browser refresh
    // new webpack.NoErrorsPlugin() // Keep errors from breaking hot reloading experience
    new webpack.NoEmitOnErrorsPlugin() // Keep errors from breaking hot reloading experience
  ],
  module: {
    loaders: [
      { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader'] },
      { test: /(\.css)$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.eot(\?v=\d+.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' }
    ]
  }
};
