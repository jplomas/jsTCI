const { assert } = require('chai');

const { Propofol } = require('../src/models/propofol');

describe('Infusions functions [propofol.js only for now]', () => {
  // TODO: Move infusions into base object?
  describe('Ensure concentrations can be reset', () => {
    it('Giving a drug then resetting restores old concentrations', () => {
      const testpatient = new Propofol();
      testpatient.Schnider(40, 70, 190, 'm');
      const oldConc = {
        ox1: testpatient.x1,
        ox2: testpatient.x2,
        ox3: testpatient.x3,
        oxeo: testpatient.xeo
      };
      testpatient.giveDrug(200);
      testpatient.resetConcs(oldConc);
      assert.equal(testpatient.x1, 0);
    });
  });
  describe('Effect site targetting bolus', () => {
    it('For an effect site of 6 in a 40 year old 70kg/190cm male patient required bolus is 95.6', () => {
      const testpatient = new Propofol();
      testpatient.Schnider(40, 70, 190, 'm');
      assert.equal(testpatient.effectBolus(6), 95.6);
    });
    describe('Plasma site targeting infusions', () => {
      it('70kg patient using Marsh returns correct data for Cp=3 over 60 seconds', () => {
        const patient = new Propofol();
        patient.Marsh(70);
        const pumpInstructions = patient.plasmaInfusion(3, 60);
        assert.equal(Math.round(pumpInstructions[0].finalMgpersec * 100) / 100, 4.91);
        assert.equal(Math.round(pumpInstructions[1].finalMgpersec * 100) / 100, 0.22);
        assert.equal(Math.round(pumpInstructions[2].finalMgpersec * 100) / 100, 0.22);
        assert.equal(Math.round(pumpInstructions[3].finalMgpersec * 100) / 100, 0.22);
        assert.equal(Math.round(pumpInstructions[4].finalMgpersec * 100) / 100, 0.22);
        assert.equal(Math.round(pumpInstructions[5].finalMgpersec * 100) / 100, 0.21);
        assert.equal(Math.round(pumpInstructions[0].sectionCp * 100) / 100, 3);
        assert.equal(Math.round(pumpInstructions[1].sectionCp * 100) / 100, 3);
        assert.equal(Math.round(pumpInstructions[2].sectionCp * 100) / 100, 3);
        assert.equal(Math.round(pumpInstructions[3].sectionCp * 100) / 100, 3);
        assert.equal(Math.round(pumpInstructions[4].sectionCp * 100) / 100, 3);
        assert.equal(Math.round(pumpInstructions[5].sectionCp * 100) / 100, 3);
      });
      it('40 year old male patient 70kg/190cm using Schnider returns correct pump instructions for Cp=3 over 60 seconds', () => {
        const patient = new Propofol();
        patient.Schnider(40, 70, 190, 'm');
        const pumpInstructions = patient.plasmaInfusion(3, 60);
        assert.equal(Math.round(pumpInstructions[0].finalMgpersec * 100) / 100, 1.4);
        assert.equal(Math.round(pumpInstructions[1].finalMgpersec * 100) / 100, 0.2);
        assert.equal(Math.round(pumpInstructions[2].finalMgpersec * 100) / 100, 0.19);
        assert.equal(Math.round(pumpInstructions[3].finalMgpersec * 100) / 100, 0.18);
        assert.equal(Math.round(pumpInstructions[4].finalMgpersec * 100) / 100, 0.17);
        assert.equal(Math.round(pumpInstructions[5].finalMgpersec * 100) / 100, 0.16);
        assert.equal(Math.round(pumpInstructions[0].sectionCp * 100) / 100, 3);
        assert.equal(Math.round(pumpInstructions[1].sectionCp * 100) / 100, 3);
        assert.equal(Math.round(pumpInstructions[2].sectionCp * 100) / 100, 3);
        assert.equal(Math.round(pumpInstructions[3].sectionCp * 100) / 100, 3);
        assert.equal(Math.round(pumpInstructions[4].sectionCp * 100) / 100, 3);
        assert.equal(Math.round(pumpInstructions[5].sectionCp * 100) / 100, 3);
      });
      it('Ensure negative drug doses are not derived when calculating pump instructions', () => {
        const patient = new Propofol();
        patient.Marsh(50);
        let pumpInstructions = patient.plasmaInfusion(2.5, 60);
        pumpInstructions = patient.plasmaInfusion(2, 120);
        assert.equal(pumpInstructions[4].finalMgpersec, 0);
        assert.equal(Math.round(pumpInstructions[4].sectionCp * 100) / 100, 2.01);
        assert.equal(Math.round(pumpInstructions[5].finalMgpersec * 100) / 100, 0.09);
      });
    });
  });
});
