/*!
 * StartIt (v1.0.0): style.js
 * Copyright (c) 2017 - 2018 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

import log from 'fancy-log';
import { printError } from './util/util';
import { debugInfo } from './util/handler';

// Compiling Sass to CSS code
const style = ({
  gulp,
  plugins,
  args,
  config,
  taskTarget,
  browserSync
}) => {
  const paths = config.paths;
  const entry = config.options.entry;
  const fileExt = config.options.fileExt;
  const cssPath = [];

  taskTarget = args.production ? paths.styles.prod : paths.styles.dev;

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

  gulp.task('style', gulp.series('lint:style', () => {
    return gulp
      .src(cssPath, {
        sourcemaps: true
        // Only deal with files that change in the pipeline
        // since: gulp.lastRun('style')
      })
      .pipe(debugInfo({ title: 'Compile:' }))
      .pipe(plugins.sass({
        outputStyle: args.production ? 'compressed' : 'expanded',
        precision: 10,
        sync: true
      }))
      .on('error', function(err) {
        plugins.sass.logError;
        browserSync.notify(printError(err), 25000);
        log.error(err);
        this.emit('end');
      })
      .pipe(plugins.cached('sass_compile'))
      .pipe(plugins.autoprefixer({
        browsers: [
          'last 2 version',
          '> 5%',
          'safari 5',
          'ios 6',
          'android 4'
        ],
        cascade: false
      }))
      .pipe(gulp.dest(taskTarget, { sourcemaps: './' }))
      .pipe(browserSync.stream({match: fileExt.css }));
  }));
};

export default style;
