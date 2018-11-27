/*!
 * Uni-Starter - deploy.js - 1.0.0
 * Copyright (c) 2017 Adorade (https://www.adorade.ro)
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
