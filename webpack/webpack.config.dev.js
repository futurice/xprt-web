const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    resolve(__dirname, 'hotReload'),
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname),
    publicPath: '/',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    contentBase: resolve(__dirname, '../assets'),
    publicPath: '/',
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve(__dirname, '../src'), resolve(__dirname)],
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|json|css)$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    alias: {
      config: join(__dirname, '..', 'config', 'development'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'XPRT (development mode)',
      favicon: 'assets/favicon.ico',
      template: 'webpack/template.html',
    }),
  ],
  performance: { hints: false },
};
