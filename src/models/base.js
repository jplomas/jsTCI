class Three {
  constructor() {
    // No initial model
    this.model = false;
    
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
/*
class Three:
    """ Base 3 compartment model"""

    def setup(self):

        # Initial concentration is zero in all components
        self.x1 = 0.0
        self.x2 = 0.0
        self.x3 = 0.0
        self.xeo = 0.0

        # declare variables so the linting doesnt get upset
        self.v1: float
        self.v2: float
        self.v3: float
        self.Q1: float
        self.Q2: float
        self.Q3: float
        self.k10: float
        self.k12: float
        self.k13: float
        self.k21: float
        self.k31: float
        self.keo: float

        # divide by 60 as we will be working in seconds
        self.k10 /= 60
        self.k12 /= 60
        self.k13 /= 60
        self.k21 /= 60
        self.k31 /= 60
        self.keo /= 60

    def from_clearances(self):
        """
        Converts intercompartment clearances into rate constants
        Needed as we currently use them for the maths

        source http://www.pfim.biostat.fr/PFIM_PKPD_library.pdf page 8
        """
        self.k10 = self.Q1 / self.v1
        self.k12 = self.Q2 / self.v1
        self.k13 = self.Q3 / self.v1
        self.k21 = (self.k12 * self.v1) / self.v2
        self.k31 = (self.k13 * self.v1) / self.v3

    def give_drug(self, drug_milligrams):
        """ add bolus of drug to central compartment """
        self.x1 = self.x1 + drug_milligrams / self.v1

    def wait_time(self, time_seconds):
        """ model distribution of drug between compartments over specified time period """

        def one_second(self):
            """ time steps must be one second for accurate modelling """

            x1k10 = self.x1 * self.k10
            x1k12 = self.x1 * self.k12
            x1k13 = self.x1 * self.k13
            x2k21 = self.x2 * self.k21
            x3k31 = self.x3 * self.k31

            xk1e = self.x1 * self.keo
            xke1 = self.xeo * self.keo

            self.x1 = self.x1 + (x2k21 - x1k12 + x3k31 - x1k13 - x1k10)
            self.x2 = self.x2 + (x1k12 - x2k21)
            self.x3 = self.x3 + (x1k13 - x3k31)

            self.xeo = self.xeo + (xk1e - xke1)

        for _ in range(time_seconds):
            one_second(self)
*/
