/*!
 * Uni-Starter - serve.js - 1.0.0
 * Copyright (c) 2017 Adorade (https://www.adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

import log from 'fancy-log';
import colors from 'ansi-colors';
// import beeper from 'beeper';
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
        // server: taskTarget,
        server: {
          baseDir: taskTarget
        },
        // Customize the Browsersync console logging prefix
        logPrefix: 'Uni-Starter',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        // https: {
        //   key: 'path-to-custom.key',
        //   cert: 'path-to-custom.crt'
        // },
        // notify: false,
        port: 1234,
        ui: false// ,
        // plugins: ['bs-console-info']
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

            // if (event === 'unlink') {
            //   unLink(path);
            //   log('File', path, 'was removed');
            //   delete plugins.cached.caches[watcher.tasks][path];    // gulp-cached remove api
            //   plugins.remember.forget(watcher.tasks, path);         // gulp-remember remove api
            // }

            // if (event === 'change') {
            //   log(`File ${path} was changed`)
            // }

            // if (event === 'add') {
            //   log(`File ${path} was added`);
            // }
          });
        // // Add event listeners.
        // .on('all', (event, path) => log(`${path} emitted ${event}`))
        // .on('add', path => log(`File ${path} was added`))
        // .on('change', path => log(`File ${path} was changed`))
        // .on('unlink', path => log(`File ${path} was removed`))

        // // More possible events.
        // .on('addDir', path => log(`Directory ${path} has been added`))
        // .on('unlinkDir', path => log(`Directory ${path} has been removed`))
        // .on('error', error => log(`Watcher error: ${error}`))
        // .on('ready', () => log('Initial scan complete. Ready for changes'))
        // .on('raw', (event, path, details) => {
        //   log('Raw event info:', event, path, details);
        // })
      }
    }
  });
};

export default serve;
