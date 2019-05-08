/*!
 * StartIt (v1.1.0): tools/tasks/serve.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import {
  lintScss, lintJs, lintPug, compile, transpile, fonts, image, convert, statics, pug
} from './';
import {
  series, watch, args, taskTarget, browserSync,
  log, magenta, bgBlue, bgRed,
  paths, fileExt, opts, watchEvent } from '../util';

// Automatically reload assets or refresh your browser when changes occur
// -----------------------------------------------------------------------------
export function serve(done) {
  if (!args.production) {
    // Serve files from the 'tmp' directory of this project
    browserSync.init({
      server: {
        baseDir: taskTarget
      },
      logPrefix: 'StartIt',
      port: 1234,
      ui: false
    });

    // Note: tasks must be a function with `.displayName`
    const watchers = [
      {
        name: 'Styles',
        paths: [paths.styles.src + fileExt.style],
        tasks: [lintScss, compile]
      },
      {
        name: 'Scripts',
        paths: [paths.scripts.src + fileExt.script],
        tasks: [lintJs, transpile]
      },
      {
        name: 'Fonts',
        paths: [paths.fonts.src + fileExt.font],
        tasks: [fonts]
      },
      {
        name: 'Images',
        paths: [paths.images.src + fileExt.image],
        tasks: [image, convert]
      },
      {
        name: 'Statics',
        paths: [paths.statics.src + fileExt.static],
        tasks: [statics]
      },
      {
        name: 'Templates',
        paths: [
          paths.views.src + fileExt.pug,
          paths.views.data + fileExt.data,  // Data files
          paths.docs.src + fileExt.docs,    // Docs files
          taskTarget + '/css/inline.css'    // inline.css
        ],
        tasks: [lintPug, pug]
      }
    ];

    for (let watcher of watchers) {
      log(bgRed(`Watching ${watcher.name}`));

      for (let p of [watcher.paths]) {
        log(`${bgBlue('Source:')} ${magenta(p)}`);
      }

      let taskNames = [];

      for (let value of Object.values(watcher.tasks)) {
        let taskName = value.displayName;
        taskNames.push(taskName);
      }

      watch(
        watcher.paths, opts.watch, series(watcher.tasks)
      )
        // https://github.com/paulmillr/chokidar#getting-started
        .on('all', (event, path) => {
          // event = event[event.length - 1] === 'e' ? event + 'd' : event + 'ed';
          watchEvent(path, event, taskNames);
        });
    }
  }
  done();
}
