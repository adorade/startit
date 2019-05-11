/*!
 * StartIt (v1.1.1): tools/util/index.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

// Load plugins
export {
  src, dest, series, parallel, lastRun, watch, tree,
  args, taskTarget, plugins, browserSync, fs, http2,
  del, log, green, magenta, bgBlue, bgRed
} from './plugins';

// Template for banner to add to file headers
export { banner } from './banner';

// Config
export { dirs, paths } from './config';

// Options
export { options as opts } from './options';

// Util
export { getJsonData, watchEvent, debugInfo } from './util';
