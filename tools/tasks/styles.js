/*!
 * StartIt (v1.1.1): tools/tasks/styles.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { lintScss } from './lint';
import {
  src, dest, series, args, plugins, browserSync,
  paths, fileExt, opts, banner, debugInfo } from '../util';

// Compiling Sass to CSS code
// ----------------------------
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
    .pipe(plugins.sass(opts.sass)).on('error', plugins.sass.logError)
    .pipe(plugins.cached('sass_compile'))
    .pipe(plugins.autoprefixer(opts.autoprefixer))
    .pipe(plugins.if(args.production, plugins.csso(opts.csso)))
    .pipe(plugins.if(args.production, plugins.rename({ extname: '.min.css' })))
    .pipe(plugins.if(!args.production, plugins.header(banner())))
    .pipe(dest(taskTarget, { sourcemaps: './' }))
    .pipe(browserSync.stream({ match: fileExt.css }));
}
compile.displayName = 'compile';

export const styles = series(
  lintScss,
  compile
);
