/*!
 * StartIt (v1.1.0): tools/util/plugins.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

// Load gulp's API
export { src, dest, series, parallel, lastRun, watch, tree } from 'gulp';

// Load all plugins in "devDependencies" into the variable $
export const plugins = require('gulp-load-plugins')({
  // when set to true, the plugin will log info to console.
  // Useful for bug reporting and issue debugging
  DEBUG: false,
  // pattern: ['*'],
  // scope: ['devDependencies'],
  rename: {
    // 'gulp-stylelint': 'gStylelint',
    // 'gulp-eslint': 'gEslint',
    'gulp-pug-linter': 'pugLinter'
    // 'ansi-colors': 'c'
  }
  // config: `${process.cwd()}/package.json`
});

// Development or Production?
import { dirs } from './config';
import minimist from 'minimist';

export const args = minimist(process.argv.slice(2));
export const taskTarget = args.production ? dirs.prod : dirs.dev;

// Load others modules
export const browserSync = require('browser-sync').create();
export const fs = require('fs');
export const http2 = require('http2');
export const del = require('del');

// For fancy log and colors in console
export const log = require('fancy-log');
export { green, magenta, bgBlue, bgRed } from 'ansi-colors';
