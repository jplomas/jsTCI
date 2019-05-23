const { expect } = require('chai');
const { assert } = require('chai');

const { Remifentanil } = require('../src/models/remifentanil');

describe('Remifentanil functions [remifentanil.js]', () => {
  describe('Models setup correctly', () => {
    it('Giving a drug without selecting a model should throw an error', () => {
      expect(() => {
        const patient = new Remifentanil();
        patient.giveDrug(50);
      }).to.throw();
    });
    it('Waiting and remodelling without selecting a model should throw an error', () => {
      expect(() => {
        const patient = new Remifentanil();
        patient.waitTime(60);
      }).to.throw();
    });
  });
  describe('Minto model', () => {
    it('40 year old 80kg/180cm patient should have v3 of 5.42', () => {
      const patient = new Remifentanil();
      patient.Minto(40, 80, 180, 'm');
      assert.equal(Math.round(patient.v3 * 100) / 100, 5.42);
    });
    it('40 year old 80kg/180cm patient should have keo of 0.0099', () => {
      const patient = new Remifentanil();
      patient.Minto(40, 80, 180, 'm');
      assert.equal(Math.round(patient.keo * 10000) / 10000, 0.0099);
    });
    it('40 year old 80kg/180cm patient should have x1 of 8.84 after 50mcg bolus', () => {
      const patient = new Remifentanil();
      patient.Minto(40, 80, 180, 'm');
      patient.giveDrug(50);
      assert.equal(Math.round(patient.x1 * 100) / 100, 8.84);
    });
    it('40 year old 80kg/180cm patient should have x1 of 3.88 60s after 50mcg bolus', () => {
      const patient = new Remifentanil();
      patient.Minto(40, 80, 180, 'm');
      patient.giveDrug(50);
      patient.waitTime(60);
      assert.equal(Math.round(patient.x1 * 100) / 100, 3.88);
    });
    it('an invalid gender should throw an error', () => {
      expect(() => {
        const patient = new Remifentanil();
        patient.Minto(20, 80, 180, 'g');
      }).to.throw();
    });
  });
});
