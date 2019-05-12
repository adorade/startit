/*!
 * StartIt (v1.1.1): tools/tasks/release.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, dest, series, plugins, fs, log } from '../util';

import conventionalGithubReleaser from 'conventional-github-releaser';

function bumpVersion() {
  return src('./package.json')
    .pipe(plugins.bump({
      type: 'minor'
    }).on('error', log.error))
    .pipe(dest('./'));
}

function changeLog() {
  return src('CHANGELOG.md', {
    buffer: false
  })
    .pipe(plugins.conventionalChangelog({
      preset: 'angular',
      releaseCount: 0
    }))
    .pipe(dest('./'));
}

function commitChanges() {
  return src('.')
    .pipe(plugins.git.add())
    .pipe(plugins.git.commit('chore(prerelease): bump version number'));
}

function pushChanges(done) {
  plugins.git.push('origin', 'master', done);
}

function createNewTag(done) {
  function getPackageJsonVersion() {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  }

  const version = getPackageJsonVersion();

  plugins.git.tag('v' + version, 'chore(release): Release v' + version, function(error) {
    if (error) {
      return done(error);
    }
    plugins.git.push('origin', 'master', { args: '--tags' }, done);
  });
}

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
  bumpVersion,
  changeLog,
  commitChanges,
  pushChanges,
  createNewTag,
  githubRelease
);
