/* eslint-disable no-console */

// A quick Node.js example of use.
// From the command line:
//          node example.js

const { Propofol } = require('./index.js');

const patient = new Propofol();
patient.Marsh(90);
patient.giveDrug(200);
console.log(patient.x1);
