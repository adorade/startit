/*!
 * StartIt (v1.0.0): settings.js
 * Copyright (c) 2017 - 2018 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

// For fancy log, colors, beep in console
import log from 'fancy-log';
import colors from 'ansi-colors';
import beeper from 'beeper';

// Check gulp configuration
const check = ({
  gulp,
  config,
  taskTarget
}) => {
  gulp.task('settings', done => {
    const gulpTree = gulp.tree();
    log(colors.green('Gulp Tasks:\n'), gulpTree.nodes);
    log(colors.magenta('Directories configuration:\n'), config.dirs);
    log(colors.magenta('Paths configuration:\n'), config.paths);
    log(colors.magenta('Options configuration:\n'), config.options);
    log(colors.magenta('Task Target:'), taskTarget);
    beeper('***-***-***');
    done();
  });
};

export default check;
