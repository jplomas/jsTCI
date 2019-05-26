/* eslint-disable global-require */

// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require('@babel/register')({
  presets: ['@babel/preset-env']
});

// Import the rest of our application.

module.exports = {
  ...require('./src/models/alfentanil.js'),
  ...require('./src/models/propofol.js'),
  ...require('./src/weights/leanbodymass.js'),
  ...require('./src/models/remifentanil.js')
};
