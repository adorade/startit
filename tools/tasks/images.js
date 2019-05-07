/*!
 * StartIt (v1.1.0): tools/tasks/images.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import {
  src, dest, lastRun, series, args, plugins, browserSync,
  paths, fileExt, opts, debugInfo } from '../util';

// Compressing new and modified images
// ----------------------------
const taskTarget = args.production ? paths.images.prod : paths.images.dev;

// Optimize images
function image() {
  return src(paths.images.src + fileExt.image, {
    // Only deal with files that change in the pipeline
    since: lastRun(image)
  })
    .pipe(debugInfo({ title: 'Optimize image:' }))
    .pipe(plugins.imagemin([
      plugins.imagemin.gifsicle(opts.images.gif),
      plugins.imagemin.jpegtran(opts.images.jpeg),
      plugins.imagemin.optipng(opts.images.png),
      plugins.imagemin.svgo(opts.images.svg)
    ]))
    .pipe(dest(taskTarget))
    .pipe(browserSync.stream({ match: fileExt.image }));
}

// Convert for web
function convert() {
  return src(paths.images.src + fileExt.webp, {
    // Only deal with files that change in the pipeline
    since: lastRun(convert)
  })
    .pipe(debugInfo({ title: 'Converted image:' }))
    .pipe(plugins.webp(opts.images.webp))
    .pipe(dest(taskTarget))
    .pipe(browserSync.stream({ match: fileExt.image }));
}

// And The Imagine
export const images = series(
  image,
  convert
);
