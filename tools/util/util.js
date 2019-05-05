/*!
 * StartIt (v1.0.0): util.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */
'use strict';

import fs from 'fs';
import foldero from 'foldero';
import log from 'fancy-log';

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
