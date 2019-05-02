/*!
 * StartIt (v1.0.0): static.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

import { debugInfo } from '../util/handler';

// Copy static files
const statics = ({
  gulp,
  args,
  config,
  taskTarget,
  browserSync
}) => {
  const paths = config.paths;
  const fileExt = config.fileExt;

  taskTarget = args.production ? paths.static.prod : paths.static.dev;
  const dest = taskTarget;

  gulp.task('static', () => {
    return gulp
      .src(paths.static.src + fileExt.static, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('static')
      })
      .pipe(debugInfo({ title: 'Copy static:' }))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream({ match: fileExt.static }));
  });
};

export default statics;
