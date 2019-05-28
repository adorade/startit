/*!
 * StartIt (v1.2.1): tools/tasks/fonts.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import {
  src, dest, lastRun, args, browserSync,
  paths, debugInfo } from '../util';

// Copy font files
// ----------------------------
const taskTarget = args.production ? paths.fonts.prod : paths.fonts.dev;

export function fonts() {
  return src(paths.fonts.src, {
    // Only deal with files that change in the pipeline
    since: lastRun(fonts)
  })
    .pipe(debugInfo({ title: 'Copy fonts:' }))
    .pipe(dest(taskTarget))
    .pipe(browserSync.stream({ match: '**/*.{otf,eot,svg,ttf,woff,woff2}' }));
}
fonts.displayName = 'fonts';
