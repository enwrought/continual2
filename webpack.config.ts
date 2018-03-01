import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as HtmlWebpackTemplate from 'html-webpack-template';
// import webpack from 'webpack';
// import path from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import HtmlWebpackTemplate from 'html-webpack-template';

import { AppConstants } from './src/lib/constants';

/*
 * Note - Bryant - inspired by:
 * https://github.com/tomastrajan/react-typescript-webpack/blob/master/webpack.config.js
 * https://github.com/Glavin001/react-hot-ts/blob/master/webpack.config.ts
 * https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
 */
const config: webpack.Configuration[] = [{
  context: path.resolve(__dirname),
  entry: [
    'react-hot-loader/patch',
    './src/client/index.tsx'
  ],
  // entry: './src/client/index.tsx',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
    // TODO: publicpath?
  },

  devtool: 'source-map',

  resolve: {
    // TODO: resolve aliases if needed later
    // alias: {},
    // extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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
      // appMountId: 'app'
    })
    // new webpack.optimize.DedupePlugin()
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'react-hot-loader/webpack',
          'awesome-typescript-loader'
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src/'),
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },

  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // },

  devServer: {
    hot: true
  }
}/* , {
  entry: './src/server/index.ts'
} */ ];

export default config;
