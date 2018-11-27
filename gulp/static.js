/*!
 * Uni-Starter - static.js - 1.0.0
 * Copyright (c) 2017 Adorade (https://www.adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

// Copy static files
const statics = ({
  gulp,
  plugins,
  args,
  config,
  taskTarget,
  browserSync
}) => {
  const paths = config.paths;
  const fileExt = config.options.fileExt;

  taskTarget = args.production ? paths.static.prod : paths.static.dev;
  const dest = taskTarget;

  gulp.task('static', () => {
    return gulp
      .src(paths.static.src + fileExt.static, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('static')
      })
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream({ match: fileExt.static }));
  });
};

export default statics;
