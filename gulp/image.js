/*!
 * Uni-Starter - image.js - 1.0.0
 * Copyright (c) 2017 Adorade (https://www.adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

import { debugInfo } from './util/handler';

// Compressing new and modified images
const image = ({
  gulp,
  plugins,
  args,
  config,
  taskTarget,
  browserSync
}) => {
  const paths = config.paths;
  const fileExt = config.options.fileExt;

  taskTarget = args.production ? paths.images.prod : paths.images.dev;
  const dest = taskTarget;

  // Optimize images
  gulp.task('image', () => {
    return gulp
      .src(paths.images.src + fileExt.image, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('image')
      })
      .pipe(plugins.imagemin([
        // plugins.imagemin.gifsicle({ interlaced: true }),
        plugins.imagemin.jpegtran({ progressive: true, max: 85 }),
        plugins.imagemin.optipng({ optimizationLevel: 5 }),
        plugins.imagemin.svgo({ plugins: [{ removeViewBox: true }] })
      ]))
      .pipe(gulp.dest(dest));
    // .pipe(browserSync.stream({ match: fileExt.image }));
  });

  // Convert for web
  gulp.task('convert', () => {
    return gulp
      .src(paths.images.src + fileExt.webp, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('convert')
      })
      .pipe(debugInfo({ title: 'Convert image:' }))
      .pipe(plugins.webp({
        preset: 'default',
        quality: 65
      }))
      .pipe(gulp.dest(dest));
    // .pipe(browserSync.stream({ match: fileExt.image }));
  });

  // And The Imagine
  const imagine = gulp.series(
    'image',
    'convert'
  );
  gulp.task('imagine', imagine);
};

export default image;
