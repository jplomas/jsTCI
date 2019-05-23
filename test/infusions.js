var Propofol = require('../src/models/propofol').Propofol;

var expect = require('chai').expect;
var assert = require('chai').assert;

describe('Infusions functions [propofol.js only for now]', function() {
// TODO: Move infusions into base object?
    describe('Ensure concentrations can be reset', function() {
        it('Giving a drug then resetting restores old concentrations', function() {
            var testpatient = new Propofol;
            testpatient.Schnider(40, 70, 190, 'm');
            oldConc = {"ox1": testpatient.x1, "ox2": testpatient.x2, "ox3": testpatient.x3, "oxeo": testpatient.xeo};  
            testpatient.giveDrug(200);
            testpatient.resetConcs(oldConc);
            assert.equal(testpatient.x1, 0);
        });
    });
    describe('Effect site targetting bolus', function() {
        it('For an effect site of 6 in a 40 year old 70kg/190cm male patient required bolus is 95.6', function() {
            var testpatient = new Propofol;
            testpatient.Schnider(40, 70, 190, 'm');
            assert.equal(testpatient.effectBolus(6), 95.6);
        });
    });
});
