var config = require('./webpack.base.config'),
  webpack = require('webpack');
var merge = require('webpack-merge')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var uglifyjs = require('uglifyjs-webpack-plugin')
var fastuglifyjsplugin = require('fast-uglifyjs-plugin')
var path = require('path')
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
    // new fastuglifyjsplugin({
    //   compress: {
    //     warnings: false
    //   },
    //   // set debug as true to output detail cache information
    //   debug: false,
    //   // enable cache by default to improve uglify performance. set false to turn it off
    //   cache: true,
    //   // root directory is the default cache path. it can be configured by following setting
    //   cacheFolder: path.resolve(__dirname, '.otherFolder'),
    //   // num of worker process default ,os.cpus().length
    //   workerNum: 2
    // }),
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
    // new BundleAnalyzerPlugin(),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.BannerPlugin('ycloud v1.2.11 author by 友云采FED')
  ]
})
module.exports = config

