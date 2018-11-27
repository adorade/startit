/*!
 * Uni-Starter (v1.0.0): gulpfile.babel.js
 * Copyright (c) 2017 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

/**
 * This gulpfile makes use of new JavaScript features.
 * Babel handles this without us having to do anything. It just works.
 * You can read more about the new JavaScript features here:
 *    https://babeljs.io/docs/learn-es2015/
 */

import gulp from 'gulp';
import fs from 'fs';
import browserSyncLib from 'browser-sync';
import minimist from 'minimist';
import gulpLoadPlugins from 'gulp-load-plugins';

// For fancy log, colors, beep in console
import log from 'fancy-log';
import colors from 'ansi-colors';
import beeper from 'beeper';

// Import project configuration as configs
// import { dirs, paths, options } from './gulp/util/config';
import * as configs from './gulp/util/config';

const config = Object.assign({}, configs);
const args = minimist(process.argv.slice(2));
const dir = config.dirs;
const taskTarget = args.production ? dir.prod : dir.dev;

// Load gulp plugins
const plugins = gulpLoadPlugins({
  // when set to true, the plugin will log info to console.
  // Useful for bug reporting and issue debugging
  DEBUG: false,
  rename: {
    'gulp-pug-linter': 'pugLinter',
    'gulp-changed-in-place': 'changedInPlace'
  }
});

// Create a new browserSync instance
const browserSync = browserSyncLib.create();

// Read all files from the gulp folder and load all gulp tasks
fs.readdirSync('./gulp')
  .filter(fileName => /\.(js)$/i.test(fileName))
  .map(fileName => require(`./gulp/${fileName}`)({
    gulp,
    config,
    args,
    taskTarget,
    plugins,
    browserSync
  }));

// Clean task
const cleanTask = args.production ? 'clean:production' : 'clean:development';

// Basic tasks
const basic = [
  'font',
  'static',
  'imagine',
  'script',
  'style',
  'pug'
];

// Build production ready code
export const build = gulp.series(
  cleanTask,
  basic
);
build.description = 'Build task for production';

// Development task with serve
export const dev = gulp.series(
  cleanTask,
  basic,
  'serve'
);
dev.description = 'Development task with serve';

// Test gulp configuration task
gulp.task('setting', done => {
  const gulpTree = gulp.tree();
  log(colors.green('Gulp Tasks:\n'), gulpTree.nodes);
  // log(colors.magenta('Directories configuration:\n'), config.dirs);
  // log(colors.magenta('Paths configuration:\n'), config.paths);
  // log(colors.magenta('Options configuration:\n'), config.options);
  // log(colors.blue('Task Target:'), taskTarget);
  beeper('***-***-***');
  done();
});

// Default gulp task
export default dev;
