/*!
 * StartIt (v1.2.1): tools/util/index.js
 * Copyright (c) 2017-21 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

// Load plugins
export {
  src, dest, series, parallel, lastRun, watch, tree,
  args, taskTarget, $, bs, fs,
  bgBlue, bgRed, blue, green, magenta, red
} from './plugins';

// Template for banner to add to file headers
export { banner } from './banner';

// Config
export { dirs, paths } from './config';

// Options
export { opts } from './options';

// Util
export { getJsonData, watchEvent, debugInfo } from './util';
