(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _propofol = require("./src/models/propofol");

var _remifentanil = require("./src/models/remifentanil");

var _alfentanil = require("./src/models/alfentanil");

var _leanbodymass = _interopRequireDefault(require("./src/weights/leanbodymass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Propofol = _propofol.Propofol;
window.Alfentanil = _alfentanil.Alfentanil;
window.Remifentanil = _remifentanil.Remifentanil;
window.leanbodymass = _leanbodymass.default;

},{"./src/models/alfentanil":2,"./src/models/propofol":4,"./src/models/remifentanil":5,"./src/weights/leanbodymass":6}],2:[function(require,module,exports){
const { Three } = require('../models/base');

class Alfentanil extends Three {
  Maitre(age, weight, height, sex) {
    if (sex !== 'm' && sex !== 'f') {
      throw new TypeError(`Unknown sex ${sex}. This algorithm can only handle m and f. :(`);
    }
    if (sex === 'm') {
      this.v1 = 0.111 * weight;
    } else {
      // sex === 'f'
      this.v1 = 0.128 * weight;
    }

    this.k12 = 0.104;
    this.k13 = 0.017;
    this.k21 = 0.0673;
    this.k31 = 0.0126;
    this.q1 = 0.356;

    if (age > 40) {
      // previously:
      // this.k31 = 0.0126 - 0.000113 * (age - 40);
      // transformed to avoid JS float errors
      this.k31 = (12600 - 113 * (age - 40) * 100000) / 100000;
      this.q1 = 0.356 - 0.00269 * (age - 40);
    }

    // calulated stuff as source paper gives mix of clearance and rate constants
    this.k10 = this.q1 / this.v1;
    this.v2 = this.v1 * (this.k12 / this.k21);
    this.v3 = this.v1 * (this.k13 / this.k31);

    this.keo = 0.77;

    this.model = true;
    this.rateConstantsToSeconds();
  }
}
module.exports = { Alfentanil };

},{"../models/base":3}],3:[function(require,module,exports){
class Three {
  constructor() {
    // No initial model
    this.model = false;

    // Empty store of previous concentrations
    this.oldConc = {};

    // Initial concentration is zero in all components
    this.x1 = 0;
    this.x2 = 0;
    this.x3 = 0;
    this.xeo = 0;
  }

  rateConstantsToSeconds() {
    this.k10 /= 60;
    this.k12 /= 60;
    this.k13 /= 60;
    this.k21 /= 60;
    this.k31 /= 60;
    this.keo /= 60;
  }

  fromClearances() {
    /*
    Converts intercompartment clearances into rate constants
    Needed as we currently use them for the maths

    source http://www.pfim.biostat.fr/PFIM_PKPD_library.pdf page 8
    */
    this.k10 = this.Q1 / this.v1;
    this.k12 = this.Q2 / this.v1;
    this.k13 = this.Q3 / this.v1;
    this.k21 = (this.k12 * this.v1) / this.v2;
    this.k31 = (this.k13 * this.v1) / this.v3;
  }

  throwIfNoModel() {
    if (!this.model) {
      throw new Error('ERROR: No drug model selected');
    }
  }

  giveDrug(drugMilligrams) {
    this.throwIfNoModel();
    // """ add bolus of drug to central compartment """
    this.x1 = this.x1 + drugMilligrams / this.v1;
  }

  oneSecond() {
    const x1k10 = this.x1 * this.k10;
    const x1k12 = this.x1 * this.k12;
    const x1k13 = this.x1 * this.k13;
    const x2k21 = this.x2 * this.k21;
    const x3k31 = this.x3 * this.k31;

    const xk1e = this.x1 * this.keo;
    const xke1 = this.xeo * this.keo;

    this.x1 = this.x1 + (x2k21 - x1k12 + x3k31 - x1k13 - x1k10);
    this.x2 = this.x2 + (x1k12 - x2k21);
    this.x3 = this.x3 + (x1k13 - x3k31);

    this.xeo = this.xeo + (xk1e - xke1);
  }

  waitTime(timeSeconds) {
    this.throwIfNoModel();
    // """ model distribution of drug between compartments over specified time period """
    for (let i = 0; i < timeSeconds; i += 1) {
      this.oneSecond();
    }
  }
}
module.exports = { Three };

},{}],4:[function(require,module,exports){
/* eslint-disable no-console */

const { Three } = require('../models/base');
const leanbodymass = require('../weights/leanbodymass');

class Propofol extends Three {
  // Infusion functions
  resetConcs(old) {
    // """ resets concentrations using python dictionary"""
    this.x1 = old.ox1;
    this.x2 = old.ox2;
    this.x3 = old.ox3;
    this.xeo = old.oxeo;
  }

  Marsh(weight) {
    this.v1 = 0.228 * weight;
    this.v2 = 0.463 * weight;
    this.v3 = 2.893 * weight;

    this.k10 = 0.119;
    this.k12 = 0.112;
    this.k13 = 0.042;
    this.k21 = 0.055;
    this.k31 = 0.0031;

    this.keo = 0.26;

    this.model = true;
    this.rateConstantsToSeconds();
  }

  Schnider(age, weight, height, sex) {
    // """ Implementation of the schnider model """
    /*  # UNITS:
        # age: years
        # weight: kilos
        # height: cm
        # sex: 'm' or 'f'   */
    const lbm = leanbodymass.james(height, weight, sex);

    this.v1 = 4.27;
    this.v2 = 18.9 - 0.391 * (age - 53);
    this.v3 = 238;

    this.k10 = 0.443 + 0.0107 * (weight - 77) - 0.0159 * (lbm - 59) + 0.0062 * (height - 177);
    this.k12 = 0.302 - 0.0056 * (age - 53);
    this.k13 = 0.196;
    this.k21 = 1.29 - (0.024 * (age - 53)) / this.v2;
    this.k31 = 0.0035;

    this.keo = 0.456;

    this.model = true;
    this.rateConstantsToSeconds();
  }

  Paedfusor(weight, age) {
    // """Paedfusor paediatric model
    // Intended age range 1-12

    // Units:
    // Weight (kg)
    /*
      Reference:
      Absalom, A, Kenny, G
      BJA: British Journal of Anaesthesia, Volume 95, Issue 1, 1 July 2005, Pages 110,
      https://doi.org/10.1093/bja/aei567
    */

    // TODO: handle warnings better
    if (age < 1) {
      console.log('Warning: age below that for which model is intended');
    }
    if (age > 12) {
      console.log('Warning: patient older than intended for model');
    }
    this.v1 = 0.46 * weight;
    this.v2 = 0.95 * weight;
    this.v3 = 5.85 * weight;

    this.k10 = 0.1527 * weight ** -0.3;
    this.k12 = 0.114;
    this.k13 = 0.042;
    this.k21 = 0.055;
    this.k31 = 0.0033;

    this.keo = 0;

    this.model = true;
    this.rateConstantsToSeconds();
  }

  Kataria(weight, age) {
    /* """Kataria paediatric model
    Intended age range 3-11

    Units:
    Age
    Weight (kg)""" */

    if (age < 3) {
      console.log('Warning: age below that for which model is intended');
    }
    if (age > 11) {
      console.log('Warning: patient older than intended for model');
    }

    this.v1 = 0.38 * weight;
    this.v2 = 0.59 * weight + 3.1 * age - 13;
    this.v3 = 6.12 * weight;

    this.Q1 = 0.037 * weight;
    this.Q2 = 0.063 * weight;
    this.Q3 = 0.025 * weight;

    this.fromClearances();

    this.keo = 0;

    this.model = true;
    this.rateConstantsToSeconds();
  }

  effectBolus(target) {
    this.throwIfNoModel();
    this.oldConc = { ox1: this.x1, ox2: this.x2, ox3: this.x3, oxeo: this.xeo };

    const ttpe = 90;
    const bolusSeconds = 10;
    let bolus = 10;
    let mgpersec = 0;
    let step = 0;

    let effectError = 100;
    while (!(effectError > -1 && effectError < 1)) {
      mgpersec = bolus / bolusSeconds;

      // replace the tenseconds method in Python implementation with this loop
      for (let i = 0; i < 10; i += 1) {
        this.giveDrug(mgpersec);
        this.waitTime(1);
      }

      this.waitTime(ttpe - 10);
      effectError = ((this.xeo - target) / target) * 100;
      step = effectError / -5;
      bolus += step;

      // # reset concentrations
      this.resetConcs(this.oldConc);
    }
    const bolusNeeded = mgpersec * 10;

    return Math.round(bolusNeeded * 10) / 10;
  }

  plasmaInfusion(target, time) {
    /*
    returns list of infusion rates to maintain desired plasma concentration
      inputs:
        target: desired plasma concentration in ug/min
        time: infusion duration in seconds

    returns:
    list of infusion rates over 10 seconds
    */

    this.oldConc = { ox1: this.x1, ox2: this.x2, ox3: this.x3, oxeo: this.xeo };
    const sections = Math.round(time / 10);
    // console.log('sections = ' + sections);
    const pumpInstructions = [];
    let firstCp = 0;
    let secondCp = 0;
    let sectionCp = 0;
    let gradient = 0;
    let finalMgpersec = 0;
    let offset = 0;

    for (let i = 0; i < sections; i += 1) {
      firstCp = this.tenseconds(3);
      this.resetConcs(this.oldConc);
      secondCp = this.tenseconds(12);
      this.resetConcs(this.oldConc);
      gradient = (secondCp - firstCp) / 9;
      offset = firstCp - gradient * 3;
      finalMgpersec = (target - offset) / gradient;
      if (finalMgpersec < 0) {
        // do not allow for a negative drug dose
        finalMgpersec = 0;
      }
      sectionCp = this.tenseconds(finalMgpersec);
      this.oldConc = {
        ox1: this.x1,
        ox2: this.x2,
        ox3: this.x3,
        oxeo: this.xeo
      };
      pumpInstructions.push({ finalMgpersec, sectionCp });
    }
    return pumpInstructions;
  }

  tenseconds(mgpersec) {
    // gives set amount of drug every second for 10 seconds
    for (let i = 0; i < 10; i += 1) {
      this.giveDrug(mgpersec);
      this.waitTime(1);
    }
    return this.x1;
  }
}
module.exports = { Propofol };

},{"../models/base":3,"../weights/leanbodymass":6}],5:[function(require,module,exports){
const { Three } = require('../models/base');
const leanbodymass = require('../weights/leanbodymass');

class Remifentanil extends Three {
  Minto(age, weight, height, sex) {
    if (sex !== 'm' && sex !== 'f') {
      throw new TypeError(`Unknown sex ${sex}. This algorithm can only handle m and f. :(`);
    }
    const leanBodyMass = leanbodymass.james(height, weight, sex);

    this.v1 = 5.1 - 0.0201 * (age - 40) + 0.072 * (leanBodyMass - 55);
    this.v2 = 9.82 - 0.0811 * (age - 40) + 0.108 * (leanBodyMass - 55);
    this.v3 = 5.42;

    this.k10 = (2.6 - 0.0162 * (age - 40) + 0.0191 * (leanBodyMass - 55)) / this.v1;
    this.k12 = (2.05 - 0.0301 * (age - 40)) / this.v1;
    this.k13 = (0.076 - 0.00113 * (age - 40)) / this.v1;
    this.k21 = this.k12 * (this.v1 / this.v2);
    this.k31 = this.k13 * (this.v1 / this.v3);

    this.keo = 0.595 - 0.007 * (age - 40);

    this.model = true;
    this.rateConstantsToSeconds();
  }
}
module.exports = { Remifentanil };

},{"../models/base":3,"../weights/leanbodymass":6}],6:[function(require,module,exports){
module.exports = {
  genderValid(sex) {
    if (sex !== 'm' && sex !== 'f') {
      throw new TypeError(`Unknown sex ${sex}. This algorithm can only handle m and f. :(`);
    }
  },
  james(height, weight, sex) {
    this.genderValid(sex);
    if (sex === 'm') {
      return 1.1 * weight - 128 * ((weight / height) * (weight / height));
    }
    // sex === 'f'
    return 1.07 * weight - 148 * ((weight / height) * (weight / height));
  },
  boer(height, weight, sex) {
    this.genderValid(sex);
    let lbm = 0;
    if (sex === 'm') {
      lbm = 0.407 * weight + 0.267 * height - 19.2;
    } else {
      lbm = 0.252 * weight + 0.473 * height - 48.3;
    }
    return Math.round(lbm * 10) / 10;
  },
  hume66(height, weight, sex) {
    this.genderValid(sex);
    let lbm = 0;
    if (sex === 'm') {
      lbm = 0.3281 * weight + 0.33929 * height - 29.5336;
    } else {
      lbm = 0.29569 * weight + 0.41813 * height - 43.2933;
    }
    return Math.round(lbm * 10) / 10;
  },
  hume71(height, weight, sex) {
    this.genderValid(sex);
    let lbm = 0;
    if (sex === 'm') {
      lbm = 0.4066 * weight + 0.2668 * height - 19.19;
    } else {
      lbm = 0.2518 * weight + 0.472 * height - 48.32;
    }

    return Math.round(lbm * 10) / 10;
  },
  janmahasation(height, weight, sex) {
    this.genderValid(sex);
    let lbm = 0;
    const bodymass = this.bmi(height, weight);
    if (sex === 'm') {
      lbm = (9270 * weight) / (6680 + 216 * bodymass);
    } else {
      lbm = (9270 * weight) / (8780 + 244 * bodymass);
    }
    return Math.round(lbm * 10) / 10;
  },
  bmi(height, weight) {
    // calculates BMI
    const bmi = weight / ((height / 100) * (height / 100));
    return Math.round(bmi * 10) / 10;
  },
  idealbodyweight(height, sex) {
    let ibm = 0;
    this.genderValid(sex);
    if (sex === 'm') {
      ibm = 50.0 + 0.91 * (height - 152.4);
    } else {
      ibm = 45.5 + 0.91 * (height - 152.4);
    }
    return Math.round(ibm * 10) / 10;
  },
  adjustedbodyweight(height, weight, sex) {
    const ibw = this.idealbodyweight(height, sex);
    const abw = ibw + 0.4 * (weight - ibw);
    return Math.round(abw * 10) / 10;
  }
};

},{}]},{},[1]);
