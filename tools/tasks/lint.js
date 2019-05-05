/*!
 * StartIt (v1.0.0): lint.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */
'use strict';

import fs from 'fs';
import { debugInfo } from '../util/handler';

// Code linting and validation
const lint = ({
  gulp,
  plugins,
  config,
  opts
}) => {
  const paths = config.paths;
  const fileExt = config.fileExt;

  // lint *.scss sources files
  gulp.task('lint:style', () => {
    return gulp
      .src(paths.styles.src + fileExt.style, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('lint:style')
      })
      .pipe(debugInfo({ title: 'Lint style:' }))
      .pipe(plugins.stylelint(opts.styles));
  });

  // lint *.es6 sources files
  gulp.task('lint:script', () => {
    const outputDir = paths.logs.gulp;
    fs.mkdirSync(`${outputDir}`, { recursive: true });
    const output = fs.createWriteStream( `${outputDir}/scripts.txt` );

    return gulp
      .src(paths.scripts.src + fileExt.script, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('lint:script')
      })
      .pipe(debugInfo({ title: 'Lint script:' }))
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format('stylish', output))
      .pipe(plugins.eslint.failAfterError());
  });

  // lint *.pug sources files
  gulp.task('lint:pug', () => {
    return gulp
      .src(paths.views.src + fileExt.pug, {
        // Only deal with files that change in the pipeline
        since: gulp.lastRun('lint:pug')
      })
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
