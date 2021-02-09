/*!
 * StartIt (v1.2.1): tools/tasks/styles.js
 * Copyright (c) 2017-21 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { lintScss } from './lint';
import {
  src, dest, series, args, $, bs, paths, opts, banner, debugInfo
} from '../util';

// Compiling Sass to CSS code
// -----------------------------------------------------------------------------
const entry = opts.entry;
const cssPath = [];

const taskTarget = args.production ? paths.styles.prod : paths.styles.dev;

if (args.production) {
  entry.css.inline = true;
  entry.css.external = false;
}

if (entry.css.external) {
  cssPath.push(paths.styles.src + entry.cssExternal);
}
if (entry.css.inline) {
  cssPath.push(paths.styles.src + entry.cssInline);
}

export function compile() {
  return src(cssPath, {
    sourcemaps: true
    // Only deal with files that change in the pipeline
    // since: gulp.lastRun(style)
  })
    .pipe(debugInfo({ title: 'Compile:' }))
    .pipe($.sass(opts.sass)).on('error', $.sass.logError)
    .pipe($.cached('sass_compile'))
    .pipe($.autoprefixer(opts.autoprefixer))
    .pipe($.if(args.production, $.csso(opts.csso)))
    .pipe($.if(args.production, $.rename({ extname: '.min.css' })))
    .pipe($.if(!args.production, $.header(banner())))
    .pipe(dest(taskTarget, { sourcemaps: './' }))
    .pipe(bs.stream({ match: '**/*.css' }));
}
compile.displayName = 'compile';

export const styles = series(
  lintScss,
  compile
);
