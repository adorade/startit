/*!
 * StartIt (v1.1.0): tools/tasks/clean.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { series, del, dirs } from '../util';

// Clean output folder at the start of every run
// ----------------------------

// Clean development output folder
export function cleanDev() {
  return del(dirs.dev);
}
cleanDev.displayName = 'clean:dev';

// Clean production output folder
export function cleanProd() {
  return del(dirs.prod);
}
cleanProd.displayName = 'clean:prod';

// Clean logs output folder
export function cleanLogs() {
  return del(dirs.logs);
}
cleanLogs.displayName = 'clean:logs';

// And The Cleaner
export const cleaner = series(
  cleanDev,
  cleanProd,
  cleanLogs
);
cleaner.displayName = 'clean:all';
