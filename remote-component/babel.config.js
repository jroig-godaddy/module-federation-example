module.exports = {
    extends: '@wsb/modal-loader-cli/lib/babel.styled-components.config.js',
    presets: [
      '@babel/preset-typescript'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      ['@fullstory/babel-plugin-annotate-react'],
      '@babel/plugin-syntax-jsx'
    ]
  };
  