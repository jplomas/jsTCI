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
}
module.exports = { Propofol };
