/*!
 * StartIt (v1.0.0): image.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
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
  const fileExt = config.fileExt;
  const opts = config.options;

  taskTarget = args.production ? paths.images.prod : paths.images.dev;
  const dest = taskTarget;

  // Optimize images
  gulp.task('image', () => {
    return gulp
      .src(paths.images.src + fileExt.image, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('image')
      })
      .pipe(debugInfo({ title: 'Optimize image:' }))
      .pipe(plugins.imagemin([
        plugins.imagemin.gifsicle(opts.images.gif),
        plugins.imagemin.jpegtran(opts.images.jpeg),
        plugins.imagemin.optipng(opts.images.png),
        plugins.imagemin.svgo(opts.images.svg)
      ]))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream({ match: fileExt.image }));
  });

  // Convert for web
  gulp.task('convert', () => {
    return gulp
      .src(paths.images.src + fileExt.webp, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('convert')
      })
      .pipe(plugins.webp(opts.images.webp))
      .pipe(debugInfo({ title: 'Converted image:' }))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream({ match: fileExt.image }));
  });

  // And The Imagine
  const imagine = gulp.series(
    'image',
    'convert'
  );
  gulp.task('imagine', imagine);
};

export default image;
