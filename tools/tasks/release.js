/*!
 * StartIt (v1.2.0): tools/tasks/release.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { series, plugins } from '../util';

import standardVersion from 'standard-version';
import conventionalGithubReleaser from 'conventional-github-releaser';

// Bump, changelog, commit, tag
function standardVers(done) {
  standardVersion({
    noVerify: true,
    infile: 'CHANGELOG.md',
    commitAll: true,
    silent: true
  });
  done();
}

// Push Changes
function pushChanges(done) {
  plugins.git.push('origin', 'master', { args: '--follow-tags' }, done);
}

// Publish release to GitHub
function githubRelease(done) {
  // Set in the settings page of your repository, as a secure variable
  const AUTH = {
    type: 'oauth',
    token: '$CONVENTIONAL_GITHUB_RELEASER_TOKEN'
  };

  conventionalGithubReleaser(AUTH, {
    preset: 'angular'
  }, done);
}

export const release = series(
  standardVers,
  pushChanges,
  githubRelease
);
