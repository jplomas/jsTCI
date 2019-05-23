/* eslint-disable global-require */

// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require('@babel/register')({
  presets: ['@babel/preset-env']
});

// Import the rest of our application.
// module.exports = require('./test/lbm.js');
module.exports = {
  ...require('./test/alfentanil.js'),
  ...require('./test/propofol.js'),
  ...require('./test/lbm.js'),
  ...require('./test/remifentanil.js'),
  ...require('./test/infusions.js')
};
