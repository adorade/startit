/*!
 * Startit (v1.2.0): .babelrc.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

const presets = [
  ['@babel/env', {
    modules: 'auto',
    loose: true
  }]
];
const plugins = [
  // your plugins here
];

module.exports = {
  presets, plugins,
  comments: false
};
