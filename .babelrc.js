/*!
 * StartIt (v1.2.1): .babelrc.js
 * Copyright (c) 2017-21 Adorade (https://adorade.ro)
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
