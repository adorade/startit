/*!
 * StartIt (v1.1.0): tools/tasks/statics.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, args, browserSync, paths, fileExt, debugInfo } from '../util';

// Copy static files
// ----------------------------
const taskTarget = args.production ? paths.statics.prod : paths.statics.dev;

export function statics() {
  return src(paths.statics.src + fileExt.static, {
    // Only deal with files that change in the pipeline
    since: lastRun(statics)
  })
    .pipe(debugInfo({ title: 'Copy static:' }))
    .pipe(dest(taskTarget))
    .pipe(browserSync.stream({ match: fileExt.static }));
}
statics.displayName = 'statics';
