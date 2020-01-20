/*!
 * StartIt (v1.2.1): tools/tasks/statics.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, lastRun, args, bs, paths, debugInfo } from '../util';

// Copy static files
// -----------------------------------------------------------------------------
const taskTarget = args.production ? paths.statics.prod : paths.statics.dev;

export function statics() {
  return src(paths.statics.src, {
    // Only deal with files that change in the pipeline
    since: lastRun(statics)
  })
    .pipe(debugInfo({ title: 'Copy static:' }))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.{json,xml,svg,ico,png}' }));
}
statics.displayName = 'statics';
