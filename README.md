# jsTCI

[![Build Status](https://travis-ci.org/jplomas/jsTCI.svg?branch=master)](https://travis-ci.org/jplomas/jsTCI)
[![Coverage Status](https://coveralls.io/repos/github/jplomas/jsTCI/badge.svg?branch=master)](https://coveralls.io/github/jplomas/jsTCI?branch=master)

A **work-in-progress** javascript implementation of PyTCI for modelling
Target Controlled Infusions in node.js or in a browser.

Ported from PyTCI: https://github.com/JMathiszig-Lee/PyTCI

## Development

1. Clone repo

2. `npm install`

3. Run tests: `npm run test`

4. Check code coverage: `npm run nyc`

## Status/TODO

### Body Mass equations

- [X] BMI
- [X] Ideal body weight (Devine)
- [X] Adjusted body weight
- [X] James Equation
- [X] Boer
- [X] Hume(1966)
- [X] Hume(1971)
- [X] Janmahasation(2005)

### Propofol models

- [X] Schnider
- [X] Marsh
- [X] Kataria
- [X] Paedfusor

### Remifentanil models

- [X] Minto

### Alfentanil models

- [X] Maitre

### Propofol infusions

- [ ] 'effect_bolus' method
- [ ] 'plasma_infusion' method

### JS infrastructure

- [X] Mocha testing framework
- [X] Code coverage
- [X] Travis CI
- [ ] Package for NPM
- [ ] Browserify & build for browser
- [ ] Usage documentation and examples
