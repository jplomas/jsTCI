class Three {
  constructor() {
    // No initial model
    this.model = false;
    
    // Empty store of previous concentrations
    this.old_conc = {};

    // Initial concentration is zero in all components
    this.x1 = 0;
    this.x2 = 0;
    this.x3 = 0;
    this.xeo = 0;
  }
  rateConstantsToSeconds() {
    this.k10 /= 60
    this.k12 /= 60
    this.k13 /= 60
    this.k21 /= 60
    this.k31 /= 60
    this.keo /= 60
  }
  fromClearances() {
    /*
    Converts intercompartment clearances into rate constants
    Needed as we currently use them for the maths

    source http://www.pfim.biostat.fr/PFIM_PKPD_library.pdf page 8
    */
    this.k10 = this.Q1 / this.v1
    this.k12 = this.Q2 / this.v1
    this.k13 = this.Q3 / this.v1
    this.k21 = (this.k12 * this.v1) / this.v2
    this.k31 = (this.k13 * this.v1) / this.v3
  }
  throwIfNoModel() {
    if (!this.model) { 
      throw 'ERROR: No drug model selected';
    }
  }
  give_drug(drug_milligrams) {
    this.throwIfNoModel();
    // """ add bolus of drug to central compartment """
    this.x1 = this.x1 + (drug_milligrams / this.v1);
  }
  one_second() {
    var x1k10 = this.x1 * this.k10;
    var x1k12 = this.x1 * this.k12;
    var x1k13 = this.x1 * this.k13;
    var x2k21 = this.x2 * this.k21;
    var x3k31 = this.x3 * this.k31;

    var xk1e = this.x1 * this.keo;
    var xke1 = this.xeo * this.keo;

    this.x1 = this.x1 + (x2k21 - x1k12 + x3k31 - x1k13 - x1k10);
    this.x2 = this.x2 + (x1k12 - x2k21);
    this.x3 = this.x3 + (x1k13 - x3k31);

    this.xeo = this.xeo + (xk1e - xke1);
  }

  wait_time(time_seconds) {
    this.throwIfNoModel();
    // """ model distribution of drug between compartments over specified time period """
    for (var i = 0; i < time_seconds; i++) {
      this.one_second();
    }
  }
}
module.exports = { Three };
