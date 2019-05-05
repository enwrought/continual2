import * as dotenv from 'dotenv';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as HtmlWebpackTemplate from 'html-webpack-template';
import * as path from 'path';
import * as webpack from 'webpack';

import { AppConstants } from 'lib';

dotenv.config({ path: __dirname + '/.env' });

/*
 * Note - Bryant - inspired by:
 * https://github.com/tomastrajan/react-typescript-webpack/blob/master/webpack.config.js
 * https://github.com/Glavin001/react-hot-ts/blob/master/webpack.config.ts
 * https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
 */
const config: webpack.Configuration[] = [{
  context: path.resolve(__dirname),
  entry: [
    // 'react-hot-loader/patch',
    'whatwg-fetch',
    './index.tsx'
  ],

  output: {
    path: path.join(__dirname, 'dist/client'),
    filename: 'bundle.js',
    publicPath: '/'
    // TODO: publicpath?
  },

  devtool: 'source-map',

  resolve: {
    // TODO: resolve aliases if needed later
    // alias: {},
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
  },

  plugins: [
    // TODO - is it possible to integrate this with the package.json description?
    new HtmlWebpackPlugin({
      title: AppConstants.APP_NAME,
      chunksSortMode: 'dependency',
      // HtmlWebpackTemplate is a fancy template
      template: HtmlWebpackTemplate,
      inject: false,
      xhtml: true,

      // HtmlWebpackTemplate params
      appMountId: AppConstants.APP_MOUNT_ID
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': dotenv.parse
    })
  ],

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.client.json'
            },
          }
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        include: [
          path.resolve(__dirname, './')
        ],
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // },

  // devServer: {
  //   historyApiFallback: true,
  //   hot: true
  // }
}];

export default config;
