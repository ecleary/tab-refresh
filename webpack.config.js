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
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // modules: true,
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },
        ],
      },
    ],
  },
};
