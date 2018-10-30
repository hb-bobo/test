const path = require('path');
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
    return path.resolve(__dirname, dir);
}
const devServer = {
    contentBase: './dist',
    hot: true,
    port: 8080,
}
module.exports = {
    entry: resolve('src/index.js'),
    output: {
        filename: '[name].bundle.js',
        path: resolve('dist'),
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true
                    }
                }
            }
        ]
    },
    devServer: devServer,
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}; 