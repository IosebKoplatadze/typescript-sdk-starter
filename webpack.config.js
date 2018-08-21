const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/somethingSDK.ts'),
  output: {
    filename: 'something.sdk.js',
    path: path.resolve(__dirname, 'dist/sdk-something'),
    library: 'SomethingSDK'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    }, {
      test: /\.(s*)css$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  mode: 'development',
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devServer: {
    contentBase: path.join(__dirname, './src')
  }
};