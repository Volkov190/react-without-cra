const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const urlJoin = require('url-join');
const packageFile = require('./package.json');

require('dotenv').config({ path: './.env' });

const HTMLWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const APP_PATH = process.env.APP_PATH || '/';
const version = JSON.stringify({
  version: packageFile.version,
  date: new Date(),
});

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: APP_PATH,
    path: path.join(__dirname, '/dist'),
    filename: 'js/[name].[hash].js',
    clean: true,
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.APP_PATH': JSON.stringify(APP_PATH),
    }),
    new ForkTsCheckerWebpackPlugin({ devServer: false, async: true }),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static', to: '', noErrorOnMissing: true }],
    }),
    {
      apply(compiler) {
        compiler.hooks.beforeRun.tapAsync('MyCustomBeforeRunPlugin', function (params, callback) {
          fs.writeFileSync(path.join(__dirname, 'static', 'version.json'), version);

          callback();
        });
      },
    },
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    proxy: {
      '/api/**': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
    historyApiFallback: {
      index: urlJoin(APP_PATH, 'index.html'),
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src/') },
    extensions: ['.ts', '.tsx', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts'],
    },
  },

  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node-modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][hash][ext][query]',
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  stats: 'normal',
  amd: false,
};
