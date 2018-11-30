/*!
 * StartIt (v1.0.0): pug.js
 * Copyright (c) 2017 - 2018 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

import fs from 'fs';
import log from 'fancy-log';
import { getJsonData, printError } from './util/util';
import { debugInfo } from './util/handler';

// Generating HTML from templates and content files
const pug = ({
  gulp,
  plugins,
  args,
  config,
  taskTarget,
  browserSync
}) => {
  const paths = config.paths;
  const entry = config.options.entry;
  const fileExt = config.options.fileExt;

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
      // compile pug to html
      .pipe(plugins.pug({
        // compress if in production
        pretty: args.production ? false: true,
        // Make data available to pug
        locals: {
          config,
          entry,
          data,
          taskTarget,
          inlinePath
        }
      }))
      .on('error', function(err) {
        log.error(err);
        browserSync.notify(printError(err), 25000);
        this.emit('end');
      })
      .pipe(plugins.cached('pug_compile'))
      // Check if inline.css exists and use inlineSource to inject it
      .pipe(plugins.if(
        fs.existsSync(inlinePath),
        plugins.inlineSource({
          rootpath: './'
        })
      ))
      .pipe(debugInfo({ title: 'Dest:' }))
      .pipe(gulp.dest(taskTarget))
      .pipe(browserSync.stream({ match: fileExt.html }));
  }));
};

export default pug;
