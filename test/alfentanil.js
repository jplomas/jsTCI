const { expect } = require('chai');
const { assert } = require('chai');

const { Alfentanil } = require('../src/models/alfentanil');

describe('Alfentanil functions [alfentanil.js]', () => {
  describe('Models setup correctly', () => {
    it('Giving a drug without selecting a model should throw an error', () => {
      expect(() => {
        const patient = new Alfentanil();
        patient.giveDrug(50);
      }).to.throw();
    });
    it('Waiting and remodelling without selecting a model should throw an error', () => {
      expect(() => {
        const patient = new Alfentanil();
        patient.waitTime(60);
      }).to.throw();
    });
  });
  describe('Maitre model', () => {
    it('30 year old 70kg/170cm male patient should have v1 of 7.77', () => {
      const patient = new Alfentanil();
      patient.Maitre(30, 70, 170, 'm');
      assert.equal(Math.round(patient.v1 * 100) / 100, 7.77);
    });
    it('30 year old 70kg/170cm male patient should have v2 of 12.01', () => {
      const patient = new Alfentanil();
      patient.Maitre(30, 70, 170, 'm');
      assert.equal(Math.round(patient.v2 * 100) / 100, 12.01);
    });
    it('30 year old 70kg/170cm male patient should have v3 of 10.48', () => {
      const patient = new Alfentanil();
      patient.Maitre(30, 70, 170, 'm');
      assert.equal(Math.round(patient.v3 * 100) / 100, 10.48);
    });
    it('30 year old 70kg/170cm male patient should have q1 of 0.356', () => {
      const patient = new Alfentanil();
      patient.Maitre(30, 70, 170, 'm');
      assert.equal(Math.round(patient.q1 * 1000) / 1000, 0.356);
    });
    it('60 year old 80kg/165cm female patient should have v1 of 10.24', () => {
      const patient = new Alfentanil();
      patient.Maitre(60, 80, 165, 'f');
      assert.equal(Math.round(patient.v1 * 100) / 100, 10.24);
    });
    it('an invalid gender should throw an error', () => {
      expect(() => {
        const patient = new Alfentanil();
        patient.Maitre(20, 80, 180, 'g');
      }).to.throw();
    });
  });
});
