var Three = require('../models/base').Three;
var leanbodymass = require('../weights/leanbodymass');

class Propofol extends Three {
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
    var lean_body_mass = leanbodymass.james(height, weight, sex)

        this.v1 = 4.27
        this.v2 = 18.9 - 0.391 * (age - 53)
        this.v3 = 238

        this.k10 = (
            0.443
            + 0.0107 * (weight - 77)
            - 0.0159 * (lean_body_mass - 59)
            + 0.0062 * (height - 177)
        )
        this.k12 = 0.302 - 0.0056 * (age - 53)
        this.k13 = 0.196
        this.k21 = 1.29 - 0.024 * (age - 53) / this.v2
        this.k31 = 0.0035

        this.keo = 0.456

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
      console.log("Warning: age below that for which model is intended");
    }
    if (age > 12) {
      console.log("Warning: patient older than intended for model");
    }
    this.v1 = 0.46 * weight;
    this.v2 = 0.95 * weight;
    this.v3 = 5.85 * weight;

    this.k10 = 0.1527 * (weight ** (-0.3));
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
      console.log("Warning: age below that for which model is intended");
    }
    if (age > 11) {
      console.log("Warning: patient older than intended for model");
    }

    this.v1 = 0.38 * weight;
    this.v2 = (0.59 * weight) + (3.1 * age) - 13;
    this.v3 = 6.12 * weight;

    this.Q1 = 0.037 * weight;
    this.Q2 = 0.063 * weight;
    this.Q3 = 0.025 * weight;

    this.fromClearances();

    this.keo = 0;

    this.model = true;
    this.rateConstantsToSeconds();
  }
  // TODO:
  // effect_bolus(target) {
  //   this.throwIfNoModel();
  //   var old_conc = {"ox1": this.x1, "ox2": this.x2, "ox3": this.x3, "oxeo": this.xeo}

  //   var ttpe = 90
  //   var bolus_seconds = 10
  //   var bolus = 10

  //   var effect_error = 100
  //   while (!(-5 < effect_error && effect_error < 5)) {
  //     console.log('effect error: ' + effect_error);
  //       var mgpersec = bolus / bolus_seconds
        
  //       for (var i = 0; i < 9; i++) {
  //         this.give_drug(mgpersec)
  //         this.wait_time(1)
  //       }

  //       this.wait_time(80)
  //       console.log('going to do maths with this.xeo='+this.xeo+' and target='+target);
  //       effect_error = ((this.xeo - target) / target) * 100
  //       var step = effect_error / -1
  //       bolus += step
  //       bolus = Math.round(bolus * 100) / 100

  //       console.log(effect_error, bolus, step, this.xeo)
  //       // # reset concentrations
  //       //TODOreset_concs(old_conc)
  //     }
  //   bolus_needed = mgpersec * 10

  //   return bolus_needed
  // }
}
module.exports = { Propofol };