/*!
 * StartIt (v1.1.1): tools/tasks/lint.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, series, lastRun, plugins, fs, paths, opts, debugInfo } from '../util';

// Code linting and validation
// ----------------------------

// lint *.scss sources files
export function lintScss() {
  return src(paths.styles.all, {
    // Only deal with files that change in the pipeline
    since: lastRun(lintScss)
  })
    .pipe(debugInfo({ title: 'Lint style:' }))
    .pipe(plugins.stylelint(opts.styles));
}
lintScss.displayName = 'lint:scss';

// lint *.es6 sources files
export function lintJs() {
  const outputDir = paths.logs.gulp;
  fs.mkdirSync(`${outputDir}`, { recursive: true });
  const output = fs.createWriteStream( `${outputDir}/scripts.txt` );

  return src(paths.scripts.src, {
    // Only deal with files that change in the pipeline
    since: lastRun(lintJs)
  })
    .pipe(debugInfo({ title: 'Lint script:' }))
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format('stylish', output))
    .pipe(plugins.eslint.failAfterError());
}
lintJs.displayName = 'lint:js';

// lint *.pug sources files
export function lintPug() {
  return src(paths.views.src, {
    // Only deal with files that change in the pipeline
    since: lastRun('lint:pug')
  })
    .pipe(debugInfo({ title: 'Lint pug:' }))
    .pipe(plugins.pugLinter({ reporter: 'default' }))
    .pipe(plugins.pugLinter({ failAfterError: true }));
}
lintPug.displayName = 'lint:pug';

// And The Linter
export const linter = series(
  lintScss,
  lintJs,
  lintPug
);
linter.displayName = 'lint:all';
