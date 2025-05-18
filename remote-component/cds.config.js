
module.exports = {
  useLinaria: false,
  input: './src/MyComponent.js',
  combineDeps: true,
  switchboard: 'module_federaton',
  webpack: {
    tsConfigFile: './tsconfig.json',
    jsModuleLoaderRulesExclude: /node_modules\/(?!(@pcxm|@partners|@switchboard))/
  },
};
