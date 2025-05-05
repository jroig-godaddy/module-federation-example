
module.exports = {
  useLinaria: false,
  input: './src/index.js',
  combineDeps: true,
  switchboard: 'module_federaton',
  webpack: {
    tsConfigFile: './tsconfig.json',
    jsModuleLoaderRulesExclude: /node_modules\/(?!(@pcxm|@partners|@switchboard))/
  },
};
