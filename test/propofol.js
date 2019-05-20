// var Three = require('../src/models/base').Three;
var Propofol = require('../src/models/propofol').Propofol;

var expect = require('chai').expect;
var assert = require('chai').assert;

var patient = new Propofol({x1:1, x2:2, x3:3, xeo:4});
console.log(patient.x1);
console.log(patient.effect_bolus(2));