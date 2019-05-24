/*!
 * StartIt (v1.2.0): tools/tasks/release.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, series, plugins, fs, log, green, magenta, red } from '../util';

import standardVersion from 'standard-version';
import conventionalGithubReleaser from 'conventional-github-releaser';

// We parse the json file instead of using `import` because the version number
// won't be updated until `standardVers` is finished
function _getPackageJsonVersion() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
}

// Wait until the version number is updated by 'standardVers'
function _fakeTimeOut() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
}

// Bump version, create changelog
async function standardVers(done) {
  standardVersion({
    noVerify: true,
    infile: 'CHANGELOG.md',
    skip: {
      commit: true,
      tag: true
    },
    silent: true
  }).then(() => {
    // standard-version is done
    log(`${green('Bumping version in')} ${magenta('package.json')}`);
    log(`${green('Outputting changes to')} ${magenta('CHANGELOG.md')}`);
  }).catch(err => {
    log.error(`standard-version failed with message: ${red(err.message)}`);
  });

  await _fakeTimeOut();

  done();
}
standardVers.displayName = 'standard:version';

// Commit changes
function commitChanges(done) {
  const newVersion = `v${_getPackageJsonVersion()}`;
  log(`${green('Commit changes...')}`);

  src('.')
    .pipe(plugins.git.add())
    .pipe(plugins.git.commit(`chore(release): ${newVersion}`));

  done();
}
commitChanges.displayName = 'commit:changes';

// Push changes
function pushChanges(done) {
  log(`${green('Push changes...')}`);

  plugins.git.push('origin', 'experimental', function(err) {
    if(err) throw (err);
    done();
  });
}
pushChanges.displayName = 'push:changes';

// Create new tag
function createNewTag(done) {
  const newVersion = `v${_getPackageJsonVersion()}`;
  log(`${green('Creating new tag:')} ${magenta(newVersion)}`);

  plugins.git.tag(`${newVersion}`, `Release ${newVersion}`, function(err) {
    if(err) throw (err);
    done();
  });
}
createNewTag.displayName = 'create:new:tag';

// Push new tag
function pushNewTag(done) {
  log(`${green('Pushing new tag to remote')}`);

  plugins.git.push('origin', 'experimental', { args: '--follow-tags' }, function(err) {
    if(err) throw (err);
    done();
  });
}
pushNewTag.displayName = 'push:new:tag';

// Publish release to GitHub
function githubRelease(done) {
  log(`${green('Publishing release to')} ${magenta('GitHub')}`);

  // Set in the settings page of your repository, as a secure variable
  const AUTH = {
    token: '$CONVENTIONAL_GITHUB_RELEASER_TOKEN'
  };

  conventionalGithubReleaser(AUTH, {
    preset: 'angular'
  }, done);
}
githubRelease.displayName = 'github:release';

export const release = series(
  standardVers,
  commitChanges,
  pushChanges,
  createNewTag,
  pushNewTag,
  githubRelease
);
