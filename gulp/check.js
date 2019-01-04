/*!
 * StartIt (v1.0.0): settings.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

// For fancy log and colors in console
import log from 'fancy-log';
import { green, magenta } from 'ansi-colors';

// Check gulp configuration
const check = ({
  gulp,
  config,
  taskTarget
}) => {
  gulp.task('settings', done => {
    const gulpTree = gulp.tree();
    log(green('Gulp Tasks:\n'), gulpTree.nodes);
    log(magenta('Directories configuration:\n'), config.dirs);
    log(magenta('Paths configuration:\n'), config.paths);
    log(magenta('Files extensions:\n'), config.fileExt);
    log(magenta('Options configuration:\n'), config.options);
    log(magenta('Task Target:'), taskTarget);
    done();
  });
};

export default check;
