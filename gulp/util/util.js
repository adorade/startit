/*!
 * Uni-Starter - util.js - 1.0.0
 * Copyright (c) 2017 Adorade (https://www.adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

import fs from 'fs';
import foldero from 'foldero';
import log from 'fancy-log';

const getJsonData = obj => {
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

const printError = error => `<h1 style="color:#c00">Error</h1><pre style="text-align:left">${error.message}</pre>`;

export {
  getJsonData,
  printError
};
