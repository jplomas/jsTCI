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
