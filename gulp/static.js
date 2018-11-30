/*!
 * StartIt (v1.0.0): static.js
 * Copyright (c) 2017 - 2018 Adorade (https://adorade.ro)
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
