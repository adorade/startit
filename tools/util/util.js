/*!
 * StartIt (v1.2.1): tools/util/util.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { fs, blue, green, magenta, red  } from './';
import foldero from 'foldero';
import log from 'fancy-log';
import through from 'through2';

export const getJsonData = obj => {
  if (fs.existsSync(obj.dataPath)) {
    // Convert directory to a JavaScript Object
    return foldero(obj.dataPath, {
      recurse: true,
      whitelist: '(.*/)*.json$',
      loader: file => {
        let json = {};
        try {
          json = JSON.parse(fs.readFileSync(file, 'utf8'));
        }
        catch (e) {
          log(`Error parsing data file: ${file}`);
          log(e);
        }

        return json;
      }
    });
  }
};

export const watchEvent = (path, event, task) => {
  log(
    `File ${magenta(path)} was ${green(event)} running ${red(task)}`
  );
};

export const debugInfo = options => {
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

      log(blue(`[ ${options.title} ]`), output);
    }
    cb(null, file);
  });
};
