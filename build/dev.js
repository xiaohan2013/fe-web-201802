const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log(__dirname)
console.log(path.join(__dirname, "../dist"))

module.exports = {
    // context: path.join(__dirname, '../src/'), // 设置源代码的默认根路径
    entry:{
        main: path.resolve(__dirname, "../src/js/main"),
        product: path.resolve(__dirname, '../src/js/product'),
        concat: path.resolve(__dirname, '../src/js/concat')
    },
    output:{
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname + '../dist'),
        publicPath: './'
    },
    module: {
        rules: [
          // { test: /\.txt$/, use: 'raw-loader' },
          {
              test: /\.(js)$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
          },
          {
              test: /\.(s?css)$/,
              use: [{
                loader: 'style-loader', // inject CSS to page
              }, {
                loader: 'css-loader', // translates CSS into CommonJS modules
              },
              {
                loader: 'postcss-loader', // Run post css actions
                options: {
                  plugins: function () { // post css plugins, can be exported to postcss.config.js
                    return [
                      require('precss'),
                      require('autoprefixer')
                    ];
                  }
                }
              },
              {
                loader: 'sass-loader' // compiles Sass to CSS
              }]
          },
          {
              test: /\.(png|jpg)$/,
              loader: 'file-loader',
              options: {
                name:'[name].[ext]',
                publicPath: './',
                outputPath:'images/'
              }
              // loader: 'url-loader?limit=8192'
          }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']  // 同时支持 js 和 jsx
    },
    // externals:{
    //   'jquery' : 'window.jQuery',
    //   'jquery' : 'window.$'
    // },
    devServer:{
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        port: 9000,
        host:'0.0.0.0',
        historyApiFallback: true,
        hot: true,
        publicPath:'/',
    },
    plugins:[
        new webpack.DefinePlugin({
            "env":"dev"
        }),
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['main'],
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/templates/index.html')
        }),
        new HtmlWebpackPlugin({
            chunks: ['product'],
            filename: 'products.html',
            template: path.resolve(__dirname, '../src/templates/products.html')
        }),
        new HtmlWebpackPlugin({
            chunks: ['concat'],
            filename: 'concat.html',
            template: path.resolve(__dirname, '../src/templates/concat.html')
        }),
        new webpack.ProvidePlugin({
             jQuery: "jquery",
             $: "jquery"
        })
    ]
}