const { expect } = require('chai');
const { assert } = require('chai');

const leanbodymass = require('../src/weights/leanbodymass');

describe('Lean body mass functions [leanbodymass.js]', () => {
  describe('leanbodymass.james', () => {
    it('165cm 90kg female should have lbm of 52kg', () => {
      assert.equal(Math.round(leanbodymass.james(165, 90, 'f')), 52);
    });
    it('180cm 60kg female should have lbm of 52kg', () => {
      assert.equal(Math.round(leanbodymass.james(180, 60, 'm')), 52);
    });
    it('an invalid gender should throw an error', () => {
      expect(() => {
        leanbodymass.james(180, 60, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.boer', () => {
    it('180cm 60kg male should have lbm of 53.3kg', () => {
      assert.equal(leanbodymass.boer(180, 60, 'm'), 53.3);
    });
    it('165cm 90kg female should have lbm of 52.4kg', () => {
      assert.equal(leanbodymass.boer(165, 90, 'f'), 52.4);
    });
    it('an invalid gender should throw an error', () => {
      expect(() => {
        leanbodymass.boer(180, 60, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.hume66', () => {
    it('180cm 60kg male should have lbm of 51.2kg', () => {
      assert.equal(leanbodymass.hume66(180, 60, 'm'), 51.2);
    });
    it('165cm 90kg female should have lbm of 52.3kg', () => {
      assert.equal(leanbodymass.hume66(165, 90, 'f'), 52.3);
    });
    it('an invalid gender should throw an error', () => {
      expect(() => {
        leanbodymass.hume66(180, 60, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.hume71', () => {
    it('180cm 60kg male should have lbm of 53.2kg', () => {
      assert.equal(leanbodymass.hume71(180, 60, 'm'), 53.2);
    });
    it('165cm 90kg female should have lbm of 52.2kg', () => {
      assert.equal(leanbodymass.hume71(165, 90, 'f'), 52.2);
    });
    it('an invalid gender should throw an error', () => {
      expect(() => {
        leanbodymass.hume71(180, 60, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.janmahasation', () => {
    it('180cm 60kg male should have lbm of 52.1kg', () => {
      assert.equal(leanbodymass.janmahasation(180, 60, 'm'), 52.1);
    });
    it('165cm 90kg female should have lbm of 49.5kg', () => {
      assert.equal(leanbodymass.janmahasation(165, 90, 'f'), 49.5);
    });
    it('an invalid gender should throw an error', () => {
      expect(() => {
        leanbodymass.janmahasation(180, 60, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.idealbodyweight', () => {
    it('180cm male should have ibm of 75.1kg', () => {
      assert.equal(leanbodymass.idealbodyweight(180, 'm'), 75.1);
    });
    it('165cm 90kg female should have lbm of 57.0kg', () => {
      assert.equal(leanbodymass.idealbodyweight(165, 'f'), 57.0);
    });
    it('an invalid gender should throw an error', () => {
      expect(() => {
        leanbodymass.idealbodyweight(180, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.adjustedbodyweight', () => {
    it('180cm male should have ibm of 75.1kg', () => {
      assert.equal(leanbodymass.adjustedbodyweight(180, 80, 'm'), 77.1);
    });
    it('165cm 90kg female should have lbm of 57.0kg', () => {
      assert.equal(leanbodymass.adjustedbodyweight(165, 90, 'f'), 70.2);
    });
    it('an invalid gender should throw an error', () => {
      expect(() => {
        leanbodymass.adjustedbodyweight(180, 60, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.bmi', () => {
    it('180cm 80kg has bmi 24.7', () => {
      assert.equal(leanbodymass.bmi(180, 80), 24.7);
    });
  });
});
