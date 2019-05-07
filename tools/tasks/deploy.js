/*!
 * StartIt (v1.1.0): tools/tasks/deploy.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, series, plugins, del, dirs, fileExt, opts, debugInfo } from '../util';

// Clean GitHub pages output folder
function cleanGhPages() {
  return del(dirs.ghpages);
}

// Publish files
function publish() {
  return src(dirs.prod + fileExt.deploy)
    .pipe(debugInfo({ title: 'GitHub Pages:' }))
    .pipe(plugins.ghPages(opts.deploy));
}

// Deploy files to Github Pages
export const deploy = series(
  cleanGhPages,
  publish
);
