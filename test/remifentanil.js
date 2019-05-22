var Remifentanil = require('../src/models/remifentanil').Remifentanil;

var expect = require('chai').expect;
var assert = require('chai').assert;

describe('Remifentanil functions [remifentanil.js]', function() {
    describe('Models setup correctly', function() {
        it('Giving a drug without selecting a model should throw an error', function() {
            expect(function() {
              var patient = new Remifentanil;  
              patient.give_drug(50);
            }).to.throw();
        });
        it('Waiting and remodelling without selecting a model should throw an error', function() {
            expect(function() {
              var patient = new Remifentanil;  
              patient.wait_time(60);
            }).to.throw();
        });
    });
    describe('Minto model', function() {
      it('40 year old 80kg/180cm patient should have v3 of 5.42', function() {
        var patient = new Remifentanil;
        patient.Minto(40, 80, 180, 'm');
        assert.equal(Math.round(patient.v3 * 100) / 100, 5.42);
      });
      it('40 year old 80kg/180cm patient should have keo of 0.0099', function() {
        var patient = new Remifentanil;
        patient.Minto(40, 80, 180, 'm');
        assert.equal(Math.round(patient.keo * 10000) / 10000, 0.0099);
      });
      it('40 year old 80kg/180cm patient should have x1 of 8.84 after 50mcg bolus', function() {
        var patient = new Remifentanil;
        patient.Minto(40, 80, 180, 'm');
        patient.give_drug(50);
        assert.equal(Math.round(patient.x1 * 100) / 100, 8.84);
      });
      it('40 year old 80kg/180cm patient should have x1 of 3.88 60s after 50mcg bolus', function() {
        var patient = new Remifentanil;
        patient.Minto(40, 80, 180, 'm');
        patient.give_drug(50);
        patient.wait_time(60);
        assert.equal(Math.round(patient.x1 * 100) / 100, 3.88);
      });
      it('an invalid gender should throw an error', function() {
        expect(function() {
          var patient = new Remifentanil;  
          patient.Minto(20, 80, 180, 'g');
        }).to.throw();
      });
    });
});
