const path = require('path');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { dependencies } = require('./package.json');
const sharedDeps = {
  react: {
    singleton: true,
    requiredVersion: '*',
    strictVersion: false,
    eager: false,
    import: false
  },
  'react-dom': {
    singleton: true,
    requiredVersion: '*',
    strictVersion: false,
    eager: false,
    import: false
  }
};
// iterate over dependencies and add them to sharedDeps
Object.keys(dependencies).forEach(dep => {
  if (dep === 'react' || dep === 'react-dom') {
    return;
  }
  sharedDeps[dep] = {
    singleton: true,
    requiredVersion: '*',
    strictVersion: false,
    eager: false,
    import: dep
  };
});


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // Use [name] and [contenthash] for unique filenames
    chunkFilename: '[id].[contenthash].js', // Ensure chunk filenames are unique
    publicPath: 'http://localhost:3001/'
  },

  
  mode: 'production',
  devServer: {
    port: 3001,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow all origins
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'my_component',
      filename: 'remoteEntry.js',
      exposes: {
        './MyComponent': './src/MyComponent',
      },
      shared: sharedDeps
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};