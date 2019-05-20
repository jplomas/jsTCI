module.exports = {
  james: function(height, weight, sex) {
    // returns lean body mass as per james equations //
    //James, W. "Research on obesity: a report of the DHSS/MRC group" HM Stationery Office 1976//

    if (sex !== 'm' && sex !== 'f') {
      throw new TypeError(
        'Unknown sex ' + sex + '. This algorithm can only handle m and f. :('
      );
    }

    if (sex === 'm') {
      return 1.1 * weight - 128 * ((weight / height) * (weight / height));
    } else {
      return 1.07 * weight - 148 * ((weight / height) * (weight / height));
    }
  },
  boer: function(height, weight, sex) {
    // returns lean body mass as per Boer equation //
    // Boer P. "Estimated lean body mass as an index for normalization of body fluid volumes in man." Am J Physiol 1984; 247: F632-5//

    if (sex !== 'm' && sex !== 'f') {
      throw new TypeError(
        'Unknown sex ' + sex + '. This algorithm can only handle m and f. :('
      );
    }

    if (sex === 'm') {
      lbm = 0.407 * weight + 0.267 * height - 19.2;
    } else {
      lbm = 0.252 * weight + 0.473 * height - 48.3;
    }
    return Math.round(lbm * 10) / 10;
  },
  hume66: function(height, weight, sex) {
    // returns lean body mass as per the 1966 Hume paper //
    // Hume, R "Prediction of lean body mass from height and weight.". J Clin Pathol. 1966 Jul; 19(4):389-91//

    if (sex !== 'm' && sex !== 'f') {
      throw new TypeError(
        'Unknown sex ' + sex + '. This algorithm can only handle m and f. :('
      );
    }

    if (sex === 'm') {
      lbm = 0.3281 * weight + 0.33929 * height - 29.5336;
    } else {
      lbm = 0.29569 * weight + 0.41813 * height - 43.2933;
    }
    return Math.round(lbm * 10) / 10;
  },
  hume71: function(height, weight, sex) {
    // returns lean body mass from Hume & Weyers(1971) //
    // Relationship between total body water and surface area in normal and obese subjects. Hume R, Weyers E J Clin Pathol 24 p234-8 (1971 Apr) //

    if (sex !== 'm' && sex !== 'f') {
      throw new TypeError(
        'Unknown sex ' + sex + '. This algorithm can only handle m and f. :('
      );
    }

    if (sex === 'm') {
      lbm = 0.4066 * weight + 0.2668 * height - 19.19;
    } else {
      lbm = 0.2518 * weight + 0.472 * height - 48.32;
    }

    return Math.round(lbm * 10) / 10;
  },
  janmahasation: function(height, weight, sex) {
    // lean body mass as per Janmahasation / Han 2005 //

    if (sex !== 'm' && sex !== 'f') {
      throw new TypeError(
        'Unknown sex ' + sex + '. This algorithm can only handle m and f. :('
      );
    }

    bodymass = this.bmi(height, weight);

    if (sex === 'm') {
      lbm = (9270 * weight) / (6680 + 216 * bodymass);
    } else {
      lbm = (9270 * weight) / (8780 + 244 * bodymass);
    }
    return Math.round(lbm * 10) / 10;
  },
  bmi: function(height, weight) {
    //calculates BMI//
    bmi = weight / ((height / 100) * (height / 100));
    return Math.round(bmi * 10) / 10;
  },
  idealbodyweight: function(height, sex) {
    // ideal body weight as per ARDSnet/Devine  //

    if (sex !== 'm' && sex !== 'f') {
      throw new TypeError(
        'Unknown sex ' + sex + '. This algorithm can only handle m and f. :('
      );
    }

    if (sex === 'm') {
      ibm = 50.0 + 0.91 * (height - 152.4);
    } else {
      ibm = 45.5 + 0.91 * (height - 152.4);
    }
    return Math.round(ibm * 10) / 10;
  },
  adjustedbodyweight: function(height, weight, sex) {
    // adjusted body weight for obese patients //

    ibw = this.idealbodyweight(height, sex);
    abw = ibw + 0.4 * (weight - ibw);

    return Math.round(abw * 10) / 10;
  }
};
