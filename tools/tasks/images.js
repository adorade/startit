/*!
 * StartIt (v1.2.1): tools/tasks/images.js
 * Copyright (c) 2017-21 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import {
  src, dest, lastRun, series, args, $, bs, paths, opts, debugInfo
} from '../util';

// Compressing new and modified images
// -----------------------------------------------------------------------------
const taskTarget = args.production ? paths.images.prod : paths.images.dev;

// Optimize images
export function image() {
  return src(paths.images.src.image, {
    // Only deal with files that change in the pipeline
    since: lastRun(image)
  })
    .pipe(debugInfo({ title: 'Optimize image:' }))
    .pipe($.imagemin([
      $.imagemin.gifsicle(opts.images.gif),
      $.imagemin.mozjpeg(opts.images.jpeg),
      $.imagemin.optipng(opts.images.png),
      $.imagemin.svgo(opts.images.svg)
    ]))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.{jpg,jpeg,gif,svg,png}' }));
}
image.displayName = 'image';

// Convert for web
export function convert() {
  return src(paths.images.src.webp, {
    // Only deal with files that change in the pipeline
    since: lastRun(convert)
  })
    .pipe(debugInfo({ title: 'Converted image:' }))
    .pipe($.webp(opts.images.webp))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.{jpg,jpeg,png,webp}' }));
}
convert.displayName = 'convert';

// And The Imagine
export const images = series(
  image,
  convert
);
