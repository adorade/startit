/*!
 * StartIt (v1.0.0): deploy.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

import { debugInfo } from '../util/handler';

// Deploy files to Github Pages
const deploy = ({
  gulp,
  plugins,
  config
}) => {
  const dir = config.dirs;
  const fileExt = config.fileExt;

  gulp.task('deploy', gulp.series('clean:ghpages', () => {
    return gulp
      .src(dir.prod + fileExt.deploy)
      .pipe(debugInfo({ title: 'GitHub Pages:' }))
      .pipe(plugins.ghPages());
  }));
};

export default deploy;
