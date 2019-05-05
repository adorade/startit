/*!
 * StartIt (v1.0.0): pug.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

import fs from 'fs';
import { getJsonData } from '../util/util';
import { debugInfo } from '../util/handler';

// Generating HTML from templates and content files
const pug = ({
  gulp,
  plugins,
  args,
  config,
  opts,
  taskTarget,
  browserSync
}) => {
  const paths = config.paths;
  const fileExt = config.fileExt;
  const entry = opts.entry;

  if (args.production) {
    entry.css.inline = true;
    entry.css.external = false;
  }

  const dataPath = paths.views.data;
  const inlinePath = taskTarget + '/css/inline.css';

  gulp.task('pug', gulp.series('lint:pug', () => {
    let data = getJsonData({dataPath}) || {};

    return gulp
      .src([
        paths.views.src + fileExt.pug,
        // Ignore files and folders that start with "_"
        '!' + paths.views.src + '{**/_*,**/_*/**}'
      ], {
        // Only deal with files that change in the pipeline
        // since: gulp.lastRun('pug')
      })
      .pipe(debugInfo({ title: 'Pug files:' }))
      .pipe(plugins.pug({
        // compress if in production
        pretty: true,
        // Make data available to pug
        locals: {
          config,
          opts,
          entry,
          data,
          taskTarget,
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
      .pipe(plugins.if(args.production, plugins.htmlmin(opts.htmlmin)))
      .pipe(debugInfo({ title: 'Dest:' }))
      .pipe(gulp.dest(taskTarget))
      .pipe(browserSync.stream({ match: fileExt.html }));
  }));
};

export default pug;
