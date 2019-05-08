/*!
 * StartIt (v1.1.0): gulpfile.esm.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { series, args } from './tools/util';
import {
  checks, help,
  cleanDev, cleanProd, cleanLogs, cleaner,
  lintScss, lintJs, lintPug, linter,
  styles, scripts, fonts, statics, images, pages,
  serve, deploy
} from './tools';

// Linters
export { lintScss, lintJs, lintPug, linter };

// Cleaners
const cleanTask = args.production ? cleanProd : cleanDev;
export { cleanLogs, cleaner };

// Basic tasks
const basic = series(
  styles,
  scripts,
  images,
  fonts,
  statics,
  pages
);

// Build production ready code
export const build = series(
  cleanTask,
  basic
);
build.description = 'Build task for production';

// Development task with serve
export const dev = series(
  cleanTask,
  basic,
  serve
);
dev.description = 'Development task with serve';

// Serve and watch
export { serve };

// Check gulp configuration task
export { checks, help };

// Deploy to GitHub Pages
export { deploy };

// Default gulp task
export default dev;
