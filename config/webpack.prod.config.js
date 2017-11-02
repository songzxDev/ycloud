var config = require('./webpack.base.config'),
  webpack = require('webpack');
var merge = require('webpack-merge')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var uglifyjs = require('uglifyjs-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 去除重复的css
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// ...
config = merge(config, {
  externals: {
    knockout: {
      root: 'ko',
      commonjs: 'knockout',
      commonjs2: 'knockout',
      amd: 'knockout'
    },
    jquery: {
      root: '$',
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery'
    },
    'ko-bindinghandler': {
      commonjs: 'ko-bindinghandler',
      commonjs2: 'ko-bindinghandler',
      amd: 'ko-bindinghandler'
    }
  },
  output: {
    publicPath: "./",
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['./dist'],
      {
        root: __dirname ,       　　　　　　　　　　//根目录
        verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
        dry:      false        　　　　　　　　　　//启用删除文件
      }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false,
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CopyWebpackPlugin([
      { from: 'src/components/bootstrap.css', to: '' }
    ]),
    new BundleAnalyzerPlugin()
  ]
})
module.exports = config

