const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

const { dependencies } = require('./package.json')
const deps = Object.keys(dependencies).reduce((acc, curr) => {
    acc[curr] = {
        singleton: true,
        eager: true,
        requiredVersion: '*',
        strictVersion: false,
    };
    return acc;
}, {});


// delete(deps['superagent']);

module.exports = {
    mode: 'development',
    entry: './src/client/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'consuming_app',
            shared: deps
          }),

        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};