/*!
 * StartIt (v1.0.0): gulpfile.babel.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

/**
 * This gulpfile makes use of new JavaScript features.
 * Babel handles this without us having to do anything. It just works.
 * You can read more about the new JavaScript features here:
 *    https://babeljs.io/docs/en/learn
 */

import gulp from 'gulp';
import fs from 'fs';
import browserSyncLib from 'browser-sync';
import minimist from 'minimist';
import gulpLoadPlugins from 'gulp-load-plugins';

// Import project configuration and options
import * as config from './tools/util/config';
import { options as opts } from './tools/util/options';
import { banner } from './tools/util/banner';

const args = minimist(process.argv.slice(2));
const dir = config.dirs;
const taskTarget = args.production ? dir.prod : dir.dev;

// Load gulp plugins
const plugins = gulpLoadPlugins({
  // when set to true, the plugin will log info to console.
  // Useful for bug reporting and issue debugging
  DEBUG: false,
  rename: {
    'gulp-pug-linter': 'pugLinter'
  }
});

// Create a new browserSync instance
const browserSync = browserSyncLib.create();

// Read all files from the `tasks` folder and load all gulp tasks
const tasksPath = './tools/tasks';
fs.readdirSync(tasksPath)
  .filter(fileName => /\.(js)$/i.test(fileName))
  // .map(fileName => fileName.split('.').reduce(a=>a)());
  .map(fileName => require(`${tasksPath}/${fileName}`)({
    gulp,
    config,
    opts,
    banner,
    args,
    taskTarget,
    plugins,
    browserSync
  }));

// Clean task
const cleanTask = args.production ? 'clean:production' : 'clean:development';

// Basic tasks
const basic = [
  'style',
  'script',
  'imagine',
  'font',
  'static',
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

// Check gulp configuration task
export const checks =  gulp.series(
  'settings'
);
checks.description = 'Check gulp configuration';

// Default gulp task
export default dev;
