/*!
 * Uni-Starter - font.js - 1.0.0
 * Copyright (c) 2017 Adorade (https://www.adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

// Copy font files
const font = ({
  gulp,
  plugins,
  args,
  config,
  taskTarget,
  browserSync
}) => {
  const paths = config.paths;
  const fileExt = config.options.fileExt;

  taskTarget = args.production ? paths.fonts.prod : paths.fonts.dev;
  const dest = taskTarget;

  gulp.task('font', () => {
    return gulp
      .src(paths.fonts.src + fileExt.font, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('font')
      })
      .pipe(gulp.dest(dest));
    // .pipe(browserSync.stream({ match: fileExt.font }));
  });
};

export default font;
