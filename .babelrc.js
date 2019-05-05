/*!
 * Startit (v1.0.0): .babelrc.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ============================================================================
 */

const presets = [
  ['@babel/env', {
    modules: 'auto',
    loose: true
  }]
];
const plugins = [
  'add-module-exports'
];

module.exports = {
  presets, plugins,
  comments: false
};
