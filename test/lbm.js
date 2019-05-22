var leanbodymass = require('../src/weights/leanbodymass');

var expect = require('chai').expect;
var assert = require('chai').assert;

describe('Lean body mass functions [leanbodymass.js]', function() {
  describe('leanbodymass.james', function() {
    it('165cm 90kg female should have lbm of 52kg', function() {
      assert.equal(Math.round(leanbodymass.james(165, 90, 'f')), 52);
    });
    it('180cm 60kg female should have lbm of 52kg', function() {
      assert.equal(Math.round(leanbodymass.james(180, 60, 'm')), 52);
    });
    it('an invalid gender should throw an error', function() {
      expect(function() {
        leanbodymass.james(180, 60, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.boer', function() {
    it('180cm 60kg male should have lbm of 53.3kg', function() {
      assert.equal(leanbodymass.boer(180, 60, 'm'), 53.3);
    });
    it('165cm 90kg female should have lbm of 52.4kg', function() {
      assert.equal(leanbodymass.boer(165, 90, 'f'), 52.4);
    });
    it('an invalid gender should throw an error', function() {
      expect(function() {
        leanbodymass.boer(180, 60, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.hume66', function() {
    it('180cm 60kg male should have lbm of 51.2kg', function() {
      assert.equal(leanbodymass.hume66(180, 60, 'm'), 51.2);
    });
    it('165cm 90kg female should have lbm of 52.3kg', function() {
      assert.equal(leanbodymass.hume66(165, 90, 'f'), 52.3);
    });
    it('an invalid gender should throw an error', function() {
      expect(function() {
        leanbodymass.hume66(180, 60, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.hume71', function() {
    it('180cm 60kg male should have lbm of 53.2kg', function() {
      assert.equal(leanbodymass.hume71(180, 60, 'm'), 53.2);
    });
    it('165cm 90kg female should have lbm of 52.2kg', function() {
      assert.equal(leanbodymass.hume71(165, 90, 'f'), 52.2);
    });
    it('an invalid gender should throw an error', function() {
      expect(function() {
        leanbodymass.hume71(180, 60, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.janmahasation', function() {
    it('180cm 60kg male should have lbm of 52.1kg', function() {
      assert.equal(leanbodymass.janmahasation(180, 60, 'm'), 52.1);
    });
    it('165cm 90kg female should have lbm of 49.5kg', function() {
      assert.equal(leanbodymass.janmahasation(165, 90, 'f'), 49.5);
    });
    it('an invalid gender should throw an error', function() {
      expect(function() {
        leanbodymass.janmahasation(180, 60, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.idealbodyweight', function() {
    it('180cm male should have ibm of 75.1kg', function() {
      assert.equal(leanbodymass.idealbodyweight(180, 'm'), 75.1);
    });
    it('165cm 90kg female should have lbm of 57.0kg', function() {
      assert.equal(leanbodymass.idealbodyweight(165, 'f'), 57.0);
    });
    it('an invalid gender should throw an error', function() {
      expect(function() {
        leanbodymass.idealbodyweight(180, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.adjustedbodyweight', function() {
    it('180cm male should have ibm of 75.1kg', function() {
      assert.equal(leanbodymass.adjustedbodyweight(180, 80, 'm'), 77.1);
    });
    it('165cm 90kg female should have lbm of 57.0kg', function() {
      assert.equal(leanbodymass.adjustedbodyweight(165, 90, 'f'), 70.2);
    });
    it('an invalid gender should throw an error', function() {
      expect(function() {
        leanbodymass.adjustedbodyweight(180, 60, 'g');
      }).to.throw();
    });
  });
  describe('leanbodymass.bmi', function() {
    it('180cm 80kg has bmi 24.7', function() {
      assert.equal(leanbodymass.bmi(180, 80), 24.7);
    });
  });
});
