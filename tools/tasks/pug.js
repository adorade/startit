/*!
 * StartIt (v1.2.0): tools/tasks/pug.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { lintPug } from './lint';
import {
  src, dest, series, args, taskTarget, plugins, browserSync, fs,
  paths, opts, debugInfo, getJsonData  } from '../util';

// Generating HTML from templates and content files
// ----------------------------
const entry = opts.entry;

if (args.production) {
  entry.css.inline = true;
  entry.css.external = false;
}

const dataPath = paths.views.data.src;
const inlinePath = taskTarget + '/css/inline.min.css';

export function pug() {
  let data = getJsonData({ dataPath }) || {};

  return src(paths.views.src, {
    // Only deal with files that change in the pipeline
    // since: lastRun(pug)
  })
    .pipe(debugInfo({ title: 'Pug files:' }))
    .pipe(plugins.pug({
      pretty: true,
      // Make data available to pug
      locals: {
        data,
        entry,
        inlinePath
      }
    }))
    .pipe(plugins.cached('pug_compile'))
    // Check if inline.css exists and use inlineSource to inject it
    .pipe(plugins.if(
      fs.existsSync(inlinePath),
      plugins.inlineSource({
        rootpath: './'
      })
    ))
    // Compress if in production
    .pipe(plugins.if(args.production, plugins.htmlmin(opts.htmlmin)))
    .pipe(debugInfo({ title: 'Dest:' }))
    .pipe(dest(taskTarget))
    .pipe(browserSync.stream({ match: '**/*.html' }));
}
pug.displayName = 'pug';

export const pages = series(
  lintPug,
  pug
);
