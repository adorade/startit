/*!
 * StartIt (v1.2.0): tools/tasks/checks.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import {
  tree, taskTarget, log, green, magenta,
  dirs, paths, opts, banner } from '../util';

// Check gulp configuration
// ----------------------------
export function checks(done) {
  const gulpTree = tree();
  log(green('Gulp Tasks:\n'), gulpTree.nodes);
  log(magenta('Directories configuration:\n'), dirs);
  log(magenta('Paths configuration:\n'), paths);
  log(magenta('Options configuration:\n'), opts);
  log(magenta('Task Target:'), taskTarget);
  log(green('Banner:\n'), banner());
  done();
}
checks.description = 'Check gulp configuration';
