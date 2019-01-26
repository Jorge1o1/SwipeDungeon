const path = require('path');

module.exports = {
  entry: './src/framework.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: "source-map"
};