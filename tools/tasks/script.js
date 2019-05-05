/*!
 * StartIt (v1.0.0): script.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */
'use strict';

import { debugInfo } from '../util/handler';

// Transpiling ES6 to cross-browser-compatible ES5 code
const scripts = ({
  gulp,
  plugins,
  args,
  config,
  opts,
  banner,
  taskTarget,
  browserSync
}) => {
  const paths = config.paths;
  const fileExt = config.fileExt;

  taskTarget = args.production ? paths.scripts.prod : paths.scripts.dev;
  const dest = taskTarget;

  gulp.task('script', gulp.series('lint:script', () => {
    return gulp
      .src(paths.scripts.src + fileExt.script, {
        sourcemaps: true,
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('script')
      })
      .pipe(debugInfo({ title: 'Transpile:' }))
      .pipe(plugins.babel(opts.babel))
      .pipe(plugins.if(args.production, plugins.uglify(opts.uglify)))
      .pipe(plugins.if(args.production, plugins.rename({ extname: '.min.js' })))
      .pipe(plugins.if(!args.production, plugins.header(banner())))
      .pipe(gulp.dest(dest, { sourcemaps: './' }))
      .pipe(browserSync.stream({ match: fileExt.js }));
  }));
};

export default scripts;
