/*!
 * Uni-Starter (v1.0.0): deploy.js
 * Copyright (c) 2017 - 2018 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */
'use strict';

// Deploy files to Github Pages
const deploy = ({
  gulp,
  plugins,
  config
}) => {
  const dir = config.dirs;
  const fileExt = config.options.fileExt;

  gulp.task('deploy', () => {
    return gulp
      .src(dir.prod + fileExt.deploy)
      .pipe(plugins.ghPages());
  });
};

export default deploy;
