var Propofol = require('../src/models/propofol').Propofol;

var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon  = require('sinon');

describe('Propofol functions [propofol.js]', function() {
  describe('Models setup correctly', function() {
    it('Giving a drug without selecting a model should throw an error', function() {
        expect(function() {
          var patient = new Propofol;  
          patient.give_drug(50);
        }).to.throw();
    });
    it('Waiting and remodelling without selecting a model should throw an error', function() {
        expect(function() {
          var patient = new Propofol;  
          patient.wait_time(60);
        }).to.throw();
    });
});
    describe('Marsh model', function() {
      it('70kg patient should have v1 of 16.0', function() {
        var patient = new Propofol;
        patient.Marsh(70);
        assert.equal(Math.round(patient.v1 * 10) / 10, 16.0);
      });
      it('70kg patient should have v2 of 32.4', function() {
        var patient = new Propofol;
        patient.Marsh(70);
        assert.equal(Math.round(patient.v2 * 10) / 10, 32.4);
      });
      it('70kg patient should have v3 of 202.5', function() {
        var patient = new Propofol;
        patient.Marsh(70);
        assert.equal(Math.round(patient.v3 * 10) / 10, 202.5);
      });
      it('90kg patient receiving 200mg should have x1 of 9.75', function() {
        var patient = new Propofol;
        patient.Marsh(90);
        patient.give_drug(200);
        assert.equal(Math.round(patient.x1 * 100) / 100, 9.75);
      });
      it('60s after 90kg patient receiving 200mg should have x1 of 7.44', function() {
        var patient = new Propofol;
        patient.Marsh(90);
        patient.give_drug(200);
        patient.wait_time(60);
        assert.equal(Math.round(patient.x1 * 100) / 100, 7.44);
      });
    });
    describe('Schnider model', function() {
      it('40 year old male 70kg/170cm patient should have v2 of 24', function() {
        var patient = new Propofol;
        patient.Schnider(40, 70, 170, 'm');
        assert.equal(Math.round(patient.v2), 24)
      });
      it('40 year old male 70kg/170cm patient receiving 200mg should have x1 of 46.84', function() {
        var patient = new Propofol;
        patient.Schnider(40, 70, 170, 'm');
        patient.give_drug(200);
        assert.equal(Math.round(patient.x1 * 100) / 100, 46.84);
      });
      it('60s after 40 year old male 70kg/170cm patient receiving 200mg should have x1 of 22.03', function() {
        var patient = new Propofol;
        patient.Schnider(40, 70, 170, 'm');
        patient.give_drug(200);
        patient.wait_time(60);
        assert.equal(Math.round(patient.x1 * 100) / 100, 22.03);
      });
    });
    describe('Paedfusor model', function() {
      it('20kg 6 year old should have v1 of 9.2', function() {
        var patient = new Propofol;
        patient.Paedfusor(20, 6);
        assert.equal(Math.round(patient.v1 * 10) / 10, 9.2);
      });
      it('20kg 6 year old should have v2 of 19', function() {
        var patient = new Propofol;
        patient.Paedfusor(20, 6);
        assert.equal(patient.v2, 19);
      });
      it('20kg 6 year old should have v3 of 117', function() {
        var patient = new Propofol;
        patient.Paedfusor(20, 6);
        assert.equal(patient.v3, 117);
      });
      it('20kg 6 year old should have k10 of 0.0624/60', function() {
        var testk10 = 0.0624 / 60;
        var patient = new Propofol;
        patient.Paedfusor(20, 6);
        assert.equal(Math.round(patient.k10 * 100000) / 100000, testk10);
      });
      it('should warn to console when age of 0.5 is passed', () => {
        var spy = sinon.spy(console, 'log');
        var patient = new Propofol;
        patient.Paedfusor(10, 0.5);
        assert(spy.calledWith('Warning: age below that for which model is intended'));
        spy.restore();
      });
      it('should warn to console when age of 13 is passed', () => {
        var spy = sinon.spy(console, 'log');
        var patient = new Propofol;
        patient.Paedfusor(10, 13);
        assert(spy.calledWith('Warning: patient older than intended for model'));
        spy.restore();
      });
    });
    describe('Kataria model', function() {
      it('20kg 6 year old should have v1 of 7.6', function() {
        var patient = new Propofol;
        patient.Kataria(20, 6);
        assert.equal(Math.round(patient.v1 * 10) / 10, 7.6);
      });
      it('20kg 6 year old should have v2 of 17.4', function() {
        var patient = new Propofol;
        patient.Kataria(20, 6);
        assert.equal(Math.round(patient.v2 * 10) / 10, 17.4);
      });
      it('20kg 6 year old should have v3 of 122.4', function() {
        var patient = new Propofol;
        patient.Kataria(20, 6);
        assert.equal(Math.round(patient.v3 * 10) / 10, 122.4);
      });
      it('should warn to console when age of 2 is passed', () => {
        var spy = sinon.spy(console, 'log');
        var patient = new Propofol;
        patient.Kataria(10, 2);
        assert(spy.calledWith('Warning: age below that for which model is intended'));
        spy.restore();
      });
      it('should warn to console when age of 12 is passed', () => {
        var spy = sinon.spy(console, 'log');
        var patient = new Propofol;
        patient.Kataria(10, 12);
        assert(spy.calledWith('Warning: patient older than intended for model'));
        spy.restore();
      });
    });
});
