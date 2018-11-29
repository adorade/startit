/*!
 * Uni-Starter (v1.0.0): serve.js
 * Copyright (c) 2017 - 2018 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

import log from 'fancy-log';
import colors from 'ansi-colors';
import { watchEvent } from './util/handler';

// Automatically reload assets or refresh your browser when changes occur
const serve = ({
  gulp,
  plugins,
  args,
  config,
  browserSync,
  taskTarget
}) => {
  const paths = config.paths;
  const fileExt = config.options.fileExt;
  const optsWatch = config.options.watch;

  // Gulp serve task
  gulp.task('serve', () => {
    if (!args.production) {
      // Serve files from the 'tmp' directory of this project
      browserSync.init({
        server: {
          baseDir: taskTarget
        },
        logPrefix: 'Uni-Starter',
        port: 1234,
        ui: false
      });

      const watchers = [
        {
          name: 'Script',
          paths: [paths.scripts.src + fileExt.script],
          tasks: ['script']
        },
        {
          name: 'Style',
          paths: [paths.styles.src + fileExt.style],
          tasks: ['style']
        },
        {
          name: 'Font',
          paths: [paths.styles.src + fileExt.font],
          tasks: ['font']
        },
        {
          name: 'Image',
          paths: [paths.styles.src + fileExt.image],
          tasks: ['image']
        },
        {
          name: 'Static',
          paths: [paths.styles.src + fileExt.static],
          tasks: ['static']
        },
        {
          name: 'Templates',
          paths: [
            paths.views.src + fileExt.pug,
            paths.views.data + fileExt.data,  // Data files
            paths.docs.src + fileExt.docs,    // Docs files
            taskTarget + '/css/inline.css'    // inline.css
          ],
          tasks: ['pug']
        }
      ];

      for (let watcher of watchers) {
        log(colors.bgRed(colors.white(`Watching ${watcher.name}`)));

        for (let p of [watcher.paths]) {
          log(colors.magenta(`Source: ${p}`));
        }

        gulp.watch(
          watcher.paths, optsWatch, gulp.series(watcher.tasks)
        )
          // https://github.com/paulmillr/chokidar#getting-started
          .on('all', (event, path) => {
            // event = event[event.length - 1] === 'e' ? event + 'd' : event + 'ed';
            watchEvent(path, event, watcher.tasks);
          });
      }
    }
  });
};

export default serve;
