/*!
 * StartIt (v1.2.1): tools/tasks/deploy.js
 * Copyright (c) 2017-21 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, series, $, dirs, paths, opts, debugInfo } from '../util';

// Clean GitHub pages output folder
function cleanGhPages() {
  return $.del(dirs.ghpages);
}

// Publish files
function publish() {
  return src(paths.deploy.src)
    .pipe(debugInfo({ title: 'GitHub Pages:' }))
    .pipe($.ghPages(opts.deploy));
}

// Deploy files to Github Pages
export const deploy = series(
  cleanGhPages,
  publish
);
