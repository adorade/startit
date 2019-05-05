/*!
 * StartIt (v1.0.0): font.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */
'use strict';

import { debugInfo } from '../util/handler';

// Copy font files
const font = ({
  gulp,
  args,
  config,
  taskTarget,
  browserSync
}) => {
  const paths = config.paths;
  const fileExt = config.fileExt;

  taskTarget = args.production ? paths.fonts.prod : paths.fonts.dev;
  const dest = taskTarget;

  gulp.task('font', () => {
    return gulp
      .src(paths.fonts.src + fileExt.font, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('font')
      })
      .pipe(debugInfo({ title: 'Copy fonts:' }))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream({ match: fileExt.font }));
  });
};

export default font;
