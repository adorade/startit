/*!
 * StartIt (v1.1.0): tools/tasks/help.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { log, green } from '../util';

// Print help message
// ----------------------------
export function help(done) {
  log('');
  log(green('=================== Help for StartIt ==================='));
  log('');
  log(green('  Usage: gulp [command]'));
  log(green('  The commands for the task runner are the following:'));
  log(green('--------------------------------------------------------'));
  log(green('    cleaner: Remove all the compiled files'));
  log(green('     linter: Lint styles, scripts and pug files'));
  log(green('     styles: Compile the Sass styles'));
  log(green('    scripts: Transpile the ES files'));
  log(green('      fonts: Copy fonts'));
  log(green('    statics: Copy static files'));
  log(green('     images: Optimize images'));
  log(green('      pages: Compile the Pug templates'));
  log(green('      serve: Start the server and watch for any changes'));
  log(green('      build: Build the project'));
  log(green('        dev: Compile and watch for changes'));
  log(green('     deploy: Deploy files to Github Pages'));
  log(green('    default: Default gulp task'));
  log(green('     checks: Check gulp configuration'));
  log(green('       help: Print help message'));
  log(green('--------------------------------------------------------'));
  log(green('  For full list of tasks use: gulp -T'));
  log('');
  done();
}
help.description = 'Print help message';
