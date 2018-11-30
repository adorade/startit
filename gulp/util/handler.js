/*!
 * StartIt (v1.0.0): handler.js
 * Copyright (c) 2017 - 2018 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

import log from 'fancy-log';
import { blue, green, magenta, red  } from 'ansi-colors';
import through from 'through2';

const watchEvent = (path, event, task) => {
  log(
    `File ${magenta(path)} was ${green(event)} running ${red(task)}`
  );
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

export {
  watchEvent,
  debugInfo
};
