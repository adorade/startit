/*!
 * Uni-Starter (v1.0.0): lint.js
 * Copyright (c) 2017 - 2018 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

// import fs from 'fs';
// import log from 'fancy-log';
import { handleError, debugInfo } from './util/handler';

// Code linting and validation
const lint = ({
  gulp,
  plugins,
  config
}) => {
  const paths = config.paths;
  const fileExt = config.options.fileExt;

  // lint *.scss sources files
  gulp.task('lint:style', () => {
    return gulp
      .src(paths.styles.src + fileExt.style, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('lint:style')
      })
      .pipe(plugins.plumber({
        errorHandler: handleError
      }))
      .pipe(debugInfo({ title: 'Lint style:' }))
      .pipe(plugins.stylelint({
        failAfterError: true,
        reportOutputDir: 'logs/gulp',
        reporters: [{
          formatter: 'string',
          save: 'styles.txt',
          console: true
        }],
        // fix: true,
        syntax: 'scss'
      }));
  });

  // lint *.es6 sources files
  gulp.task('lint:script', () => {
    // const output = fs.createWriteStream('logs/gulp/scripts.txt');

    return gulp
      .src(paths.scripts.src + fileExt.script, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('lint:script')
      })
      .pipe(plugins.plumber({
        errorHandler: handleError
      }))
      .pipe(debugInfo({ title: 'Lint script:' }))
      .pipe(plugins.eslint({
        // fix: true
      }))
      .pipe(plugins.eslint.format())
      // .pipe(plugins.eslint.format('stylish', output))
      .pipe(plugins.eslint.format('stylish'))
      .pipe(plugins.eslint.failAfterError());
  });

  // lint *.pug sources files
  gulp.task('lint:pug', () => {
    return gulp
      .src(paths.views.src + fileExt.pug, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('lint:pug')
      })
      .pipe(plugins.plumber({
        errorHandler: handleError
      }))
      .pipe(debugInfo({ title: 'Lint pug:' }))
      .pipe(plugins.pugLinter({ reporter: 'default' }))
      .pipe(plugins.pugLinter({ failAfterError: true }));
  });

  // And The Linter
  const linter = gulp.series(
    'lint:style',
    'lint:script',
    'lint:pug'
  );
  gulp.task('linter', linter);
};

export default lint;
