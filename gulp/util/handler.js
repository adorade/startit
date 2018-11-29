/*!
 * Uni-Starter (v1.0.0): handler.js
 * Copyright (c) 2017 - 2018 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

import log from 'fancy-log';
import beeper from 'beeper';
import colors from 'ansi-colors';
import notify from 'gulp-notify';
import through from 'through2';

const { blue, green, magenta, red  } = colors;

const handleError = function(err) {
  // User desktop notification
  // ----------------------------------------------
  notify.logLevel(0);
  notify.onError({
    title: `Gulp error in: ${err.plugin}`,
    message: `Error: ${err.message}`,
    sound: true,
    wait: true,
    type: 'error'
  })(err);

  // Pretty error reporting
  // ----------------------------------------------
  log(
    blue(`[ Gulp error in: ${err.plugin} ]`),
    red(`Error: ${err.message}`)
  );

  // System beep
  // ----------------------------------------------
  beeper();

  // Prevent the 'watch' task from stopping
  // ----------------------------------------------
  this.emit('end');
};

const watchEvent = (path, event, task) => {
  log(
    'File', magenta(path),
    'was', green(event),
    'running', red(task)
  );
  // beeper();
};

const debugInfo = options => {
  options = Object.assign({
    title: 'Debug:',
    showFiles: true,
    minimal: true
  }, options);

  if (process.argv.indexOf('--verbose') !== -1) {
    options.verbose = true;
    options.minimal = false;
    options.showFiles = true;
  }

  // Pretty debug reporting
  // ----------------------------------------------
  return through.obj(function(file, enc, cb) {
    if(options.showFiles) {
      const full = '\n' +
        'cwd:   ' + green(file.cwd) + '\n' +
        'base:  ' + green(file.base) + '\n' +
        'path:  ' + green(file.path) + '\n' +
        (options.verbose
          ? 'stat:  ' + green(JSON.stringify(file.stat, null, '       ').replace(/[{"}]/g, '').trim())
          : ''
        ) + '\n';

      const short = green(file.relative);
      const output = options.minimal ? short : full;

      log( blue(`[ ${options.title} ]`), output );
    }
    cb(null, file);
  });
};

const eslintError = function (details) {

  let messages = details.eslint.messages;
  let messagesLength = details.eslint.messages.length;
  let errorMessages = '';

  // stop if there are no messages
  if (messagesLength === 0) return;

  // loop through array of messages
  for (let error of messages) {
    errorMessages += error.message + ' ';
  }

  // send message to user
  notify.onError({
    title: 'JavaScript error',
    // message: 'Location: ' + details.relative + ' ' + errorMessages,
    message: `Location: ${details.relative} ${errorMessages}`,
    sound: 'Beep'
  })(details);
};

const babelError = function (err) {
  log.error('[Compilation Error]');
  log.error(err.fileName + (err.loc ? `( ${err.loc.line}, ${err.loc.column} ): ` : ': '));
  log.error('error Babel: ' + err.message + '\n');
  log.error(err.codeFrame);

  this.emit('end');
};

export {
  handleError,
  watchEvent,
  debugInfo,
  eslintError,
  babelError
};
