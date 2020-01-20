/*!
 * StartIt (v1.2.1): tools/tasks/scripts.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { lintJs } from './lint';
import {
  src, dest, series, lastRun, args, $, bs, paths, opts, banner, debugInfo
} from '../util';

// Transpiling ES6 to cross-browser-compatible ES5 code
// -----------------------------------------------------------------------------
const taskTarget = args.production ? paths.scripts.prod : paths.scripts.dev;

export function transpile() {
  return src(paths.scripts.src, {
    sourcemaps: true,
    // Only deal with files that change in the pipeline
    since: lastRun(transpile)
  })
    .pipe(debugInfo({ title: 'Transpile:' }))
    .pipe($.babel(opts.babel))
    .pipe($.if(args.production, $.uglify(opts.uglify)))
    .pipe($.if(args.production, $.rename({ extname: '.min.js' })))
    .pipe($.if(!args.production, $.header(banner())))
    .pipe(dest(taskTarget, { sourcemaps: './' }))
    .pipe(bs.stream({ match: '**/*.js' }));
}
transpile.displayName = 'transpile';

export const scripts = series(
  lintJs,
  transpile
);
