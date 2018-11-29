/*!
 * Uni-Starter (v1.0.0): clean.js
 * Copyright (c) 2017 - 2018 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

import del from 'del';

// Clean output folder at the start of every run
const clean = ({
  gulp,
  config
}) => {
  const dir = config.dirs;

  // Clean development output folder
  gulp.task('clean:development', () => {
    return del(dir.dev);
  });

  // Clean production output folder
  gulp.task('clean:production', () => {
    return del(dir.prod);
  });

  // Clean GitHub pages output folder
  gulp.task('clean:ghpages', () => {
    return del(dir.ghpages);
  });

  // And The Cleaner
  const cleaner = gulp.series(
    'clean:development',
    'clean:production',
    'clean:ghpages'
  );
  gulp.task('cleaner', cleaner);
};

export default clean;
