/*!
 * StartIt (v1.2.1): tools/tasks/pug.js
 * Copyright (c) 2017-21 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { lintPug } from './lint';
import {
  src, dest, series, args, taskTarget, $, bs, fs, paths, opts, debugInfo, getJsonData
} from '../util';

// Generating HTML from templates and content files
// -----------------------------------------------------------------------------
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
    .pipe($.pug({
      pretty: true,
      // Make data available to pug
      locals: {
        data,
        entry,
        inlinePath
      }
    }))
    .pipe($.cached('pug_compile'))
    // Check if inline.css exists and use inlineSource to inject it
    .pipe($.if(
      fs.existsSync(inlinePath),
      $.inlineSource({
        rootpath: './'
      })
    ))
    // Compress if in production
    .pipe($.if(args.production, $.htmlmin(opts.htmlmin)))
    .pipe(debugInfo({ title: 'Dest:' }))
    .pipe(dest(taskTarget))
    .pipe(bs.stream({ match: '**/*.html' }));
}
pug.displayName = 'pug';

export const pages = series(
  lintPug,
  pug
);
