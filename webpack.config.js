const path = require('path');

const SRC_DIR = path.join(__dirname, './client/src');
const TGT_DIR = path.join(__dirname, './client/public');


module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: TGT_DIR,
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
    ],
  },
};
