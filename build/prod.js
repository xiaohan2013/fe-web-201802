const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // context: path.join(__dirname, '../src/'), // 设置源代码的默认根路径
    entry:{
        main: path.resolve(__dirname, "../src/js/main")
    },
    output:{
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: './'
    },
    module: {
        rules: [
          // { test: /\.txt$/, use: 'raw-loader' },
          {
              test: /\.(scss)$/,
              use: [{
                loader: 'style-loader', // inject CSS to page
              }, {
                loader: 'css-loader', // translates CSS into CommonJS modules
              }, {
                loader: 'postcss-loader', // Run post css actions
                options: {
                  plugins: function () { // post css plugins, can be exported to postcss.config.js
                    return [
                      require('precss'),
                      require('autoprefixer')
                    ];
                  }
                }
              }, {
                loader: 'sass-loader' // compiles Sass to CSS
              }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']  // 同时支持 js 和 jsx
    },
    devServer:{
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        port: 9000,
        host:'0.0.0.0',
        historyApiFallback: true,
        hot: true,
        publicPath:'./',
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/templates/index.html')
        })
    ]
}