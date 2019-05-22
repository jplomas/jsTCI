var Three = require('../models/base').Three;
var leanbodymass = require('../weights/leanbodymass');

class Remifentanil extends Three {
  Minto(age, weight, height, sex) {
    if (sex !== 'm' && sex !== 'f') {
      throw new TypeError(
        'Unknown sex ' + sex + '. This algorithm can only handle m and f. :('
      );
    }
    var leanBodyMass = leanbodymass.james(height, weight, sex)

    this.v1 = 5.1 - 0.0201 * (age - 40) + 0.072 * (leanBodyMass - 55)
    this.v2 = 9.82 - 0.0811 * (age - 40) + 0.108 * (leanBodyMass - 55)
    this.v3 = 5.42

    this.k10 = (
        2.6 - 0.0162 * (age - 40) + 0.0191 * (leanBodyMass - 55)
    ) / this.v1
    this.k12 = (2.05 - 0.0301 * (age - 40)) / this.v1
    this.k13 = (0.076 - 0.00113 * (age - 40)) / this.v1
    this.k21 = this.k12 * (this.v1 / this.v2)
    this.k31 = this.k13 * (this.v1 / this.v3)

    this.keo = 0.595 - 0.007 * (age - 40)


    this.model = true;
    this.rateConstantsToSeconds();
  }
}
module.exports = { Remifentanil };