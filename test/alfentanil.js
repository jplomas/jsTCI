var Alfentanil = require('../src/models/alfentanil').Alfentanil;

var expect = require('chai').expect;
var assert = require('chai').assert;

describe('Alfentanil functions [alfentanil.js]', function() {
  describe('Models setup correctly', function() {
    it('Giving a drug without selecting a model should throw an error', function() {
        expect(function() {
          var patient = new Alfentanil;  
          patient.give_drug(50);
        }).to.throw();
    });
    it('Waiting and remodelling without selecting a model should throw an error', function() {
        expect(function() {
          var patient = new Alfentanil;  
          patient.wait_time(60);
        }).to.throw();
    });
});
    describe('Maitre model', function() {
      it('30 year old 70kg/170cm patient should have v1 of 7.77', function() {
        var patient = new Alfentanil;
        patient.Maitre(30, 70, 170, 'm');
        assert.equal(Math.round(patient.v1 * 100) / 100, 7.77);
      });
      it('30 year old 70kg/170cm patient should have v2 of 12.01', function() {
        var patient = new Alfentanil;
        patient.Maitre(30, 70, 170, 'm');
        assert.equal(Math.round(patient.v2 * 100) / 100, 12.01);
      });
      it('30 year old 70kg/170cm patient should have v3 of 10.48', function() {
        var patient = new Alfentanil;
        patient.Maitre(30, 70, 170, 'm');
        assert.equal(Math.round(patient.v3 * 100) / 100, 10.48);
      });
      it('30 year old 70kg/170cm patient should have q1 of 0.356', function() {
        var patient = new Alfentanil;
        patient.Maitre(30, 70, 170, 'm');
        assert.equal(Math.round(patient.q1 * 1000) / 1000, 0.356);
      });
      it('an invalid gender should throw an error', function() {
        expect(function() {
          var patient = new Alfentanil;  
          patient.Maitre(20, 80, 180, 'g');
        }).to.throw();
      });
    });
});
