/*!
 * StartIt (v1.1.0): help.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */
'use strict';

// For fancy log and colors in console
import log from 'fancy-log';
import { green } from 'ansi-colors';

// Help Task
const help = ({
  gulp
}) => {
  gulp.task('help', done => {
    log('');
    log(green('=================== Help for StartIt ==================='));
    log('');
    log(green('  Usage: gulp [command]'));
    log(green('  The commands for the task runner are the following.'));
    log(green('--------------------------------------------------------'));
    log(green('    cleaner: Remove all the compiled files'));
    log(green('     linter: Lint styles, scripts and pug files'));
    log(green('      style: Compile the Sass styles'));
    log(green('     script: Transpile the ES files'));
    log(green('       font: Copy fonts'));
    log(green('     static: Copy static files'));
    log(green('     images: Optimize images'));
    log(green('        pug: Compile the Pug templates'));
    log(green('      serve: Start the server and watch for any changes'));
    log(green('      build: Build the project'));
    log(green('        dev: Compile and watch for changes'));
    log(green('     deploy: Deploy files to Github Pages'));
    log(green('    default: Default gulp task'));
    log(green('     checks: Check gulp configuration'));
    log(green('       help: Print help message'));
    log('');
    done();
  });
};

export default help;
