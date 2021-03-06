const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3001,
    publicPath: 'http://localhost:3001/dist',
    hotOnly: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
