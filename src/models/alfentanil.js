var Three = require('../models/base').Three;

class Alfentanil extends Three {
  Maitre(age, weight, height, sex) {
    if (sex !== 'm' && sex !== 'f') {
      throw new TypeError(
        'Unknown sex ' + sex + '. This algorithm can only handle m and f. :('
      );
    }
    if (sex === "m") {
      this.v1 = 0.111 * weight
    } else {
      // sex === "f"
      this.v1 = 0.128 * weight
    }

    this.k12 = 0.104
    this.k13 = 0.017
    this.k21 = 0.0673
    this.k31 = 0.0126
    this.q1 = 0.356

    if (age > 40) {
      this.k31 = 0.0126 - (0.000113 * (age - 40))
      this.q1 = 0.356 - (0.00269 * (age - 40))
    }
    
    // calulated stuff as source paper gives mix of clearance and rate constants
    this.k10 = this.q1 / this.v1
    this.v2 = this.v1 * (this.k12 / this.k21)
    this.v3 = this.v1 * (this.k13 / this.k31)

    this.keo = 0.77

    this.model = true;
    this.rateConstantsToSeconds();
  }
}
module.exports = { Alfentanil };