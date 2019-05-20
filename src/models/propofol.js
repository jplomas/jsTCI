var Three = require('../models/base').Three;

class Propofol extends Three {
  effect_bolus(target) {
    var old_conc = {"ox1": this.x1, "ox2": this.x2, "ox3": this.x3, "oxeo": this.xeo}

    var ttpe = 90
    var bolus_seconds = 10
    var bolus = 10

    var effect_error = 100
    while (!(-5 < effect_error && effect_error < 5)) {
        var mgpersec = bolus / bolus_seconds
        
        for (var i = 0; i < 9; i++) {
          this.give_drug(mgpersec)
          this.wait_time(1)
        }

        this.wait_time(80)
        effect_error = ((this.xeo - target) / target) * 100
        var step = effect_error / -1
        bolus += step
        bolus = Math.round(bolus * 100) / 100

        console.log(effect_error, bolus, step, this.xeo)
        // # reset concentrations
        //TODOreset_concs(old_conc)
      }
    bolus_needed = mgpersec * 10

    return bolus_needed
  }
}
module.exports = { Propofol };