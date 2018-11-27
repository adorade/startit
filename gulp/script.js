/*!
 * Uni-Starter - script.js - 1.0.0
 * Copyright (c) 2017 Adorade (https://www.adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

import { handleError, debugInfo } from './util/handler';

// Transpiling ES6 to cross-browser-compatible ES5 code
const scripts = ({
  gulp,
  plugins,
  args,
  config,
  taskTarget,
  browserSync
}) => {
  const paths = config.paths;
  const fileExt = config.options.fileExt;

  taskTarget = args.production ? paths.scripts.prod : paths.scripts.dev;
  const dest = taskTarget;

  gulp.task('script', gulp.series('lint:script', () => {
    return gulp
      .src(paths.scripts.src + fileExt.script, {
        sourcemaps: true,
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('script')
      })
      .pipe(plugins.plumber({
        errorHandler: handleError
      }))
      .pipe(debugInfo({ title: 'Transpile:' }))
      .pipe(plugins.babel({
        presets: ['@babel/preset-env']
      }))
      .pipe(gulp.dest(dest, { sourcemaps: './' }))
      .pipe(browserSync.stream({ match: fileExt.js }));
  }));
};

export default scripts;