/*!
 * StartIt (v1.1.1): tools/tasks/scripts.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { lintJs } from './lint';
import {
  src, dest, series, lastRun, args, plugins, browserSync,
  paths, fileExt, opts, banner, debugInfo } from '../util';

// Transpiling ES6 to cross-browser-compatible ES5 code
// ----------------------------
const taskTarget = args.production ? paths.scripts.prod : paths.scripts.dev;

export function transpile() {
  return src(paths.scripts.src + fileExt.script, {
    sourcemaps: true,
    // Only deal with files that change in the pipeline
    since: lastRun(transpile)
  })
    .pipe(debugInfo({ title: 'Transpile:' }))
    .pipe(plugins.babel(opts.babel))
    .pipe(plugins.if(args.production, plugins.uglify(opts.uglify)))
    .pipe(plugins.if(args.production, plugins.rename({ extname: '.min.js' })))
    .pipe(plugins.if(!args.production, plugins.header(banner())))
    .pipe(dest(taskTarget, { sourcemaps: './' }))
    .pipe(browserSync.stream({ match: fileExt.js }));
}
transpile.displayName = 'transpile';

export const scripts = series(
  lintJs,
  transpile
);
