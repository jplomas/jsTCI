# jsTCI

[![Build Status](https://travis-ci.org/jplomas/jsTCI.svg?branch=master)](https://travis-ci.org/jplomas/jsTCI)
[![Coverage Status](https://coveralls.io/repos/github/jplomas/jsTCI/badge.svg?branch=master&kill_cache=1)](https://coveralls.io/github/jplomas/jsTCI?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/faa36652ca614a08a4f2d02797f589e4)](https://www.codacy.com/app/jplomas/jsTCI?utm_source=github.com&utm_medium=referral&utm_content=jplomas/jsTCI&utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/63eedcde8b39f251d3c5/maintainability)](https://codeclimate.com/github/jplomas/jsTCI/maintainability)
[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/jplomas/jsTCI/blob/master/LICENSE)

A **work-in-progress** javascript implementation of PyTCI for modelling
Target Controlled Infusions in node.js or in a browser.

Ported from PyTCI: <https://github.com/JMathiszig-Lee/PyTCI>

## Development

1. Clone repo

2. `npm install`

3. Run tests: `npm run test`

4. Check code coverage: `npm run nyc`

## Status/TODO

### Body Mass equations

- [x] BMI
- [x] Ideal body weight (Devine)
- [x] Adjusted body weight
- [x] James Equation
- [x] Boer
- [x] Hume(1966)
- [x] Hume(1971)
- [x] Janmahasation(2005)

### Propofol models

- [x] Schnider
- [x] Marsh
- [x] Kataria
- [x] Paedfusor

### Remifentanil models

- [x] Minto

### Alfentanil models

- [x] Maitre

### Propofol infusions

- [x] 'effectBolus' method
- [x] 'plasma_infusion' method

### JS infrastructure

- [x] Mocha testing framework
- [x] Code coverage
- [x] Travis CI
- [ ] Package for NPM
- [X] Browserify & build for browser
- [ ] Usage documentation
- [X] Usage examples

## FYI...

A very rudimentary example running in the browser is included in `dist/index.html`
