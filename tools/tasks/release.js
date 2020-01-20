/*!
 * StartIt (v1.2.1): tools/tasks/release.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { src, series, $, fs, green, magenta, red } from '../util';

import standardVersion from 'standard-version';
import conventionalGithubReleaser from 'conventional-github-releaser';
import { exec } from 'child_process';

// We parse the json file instead of using `import` because the version number
// won't be updated until `standardVers` is finished
function _getPackageJsonVersion() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
}

// Get current tag
function _getCurrentTag() {
  return new Promise((resolve, reject) => {
    const cmd = 'git describe --abbrev=0 --tags';
    return exec(cmd, (err, stdout) => {
      if (err) {
        return reject(err);
      }
      const currTag = stdout.toString().trim();
      return resolve(currTag);
    });
  });
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
    $.log(`${green('Bumping version in')} ${magenta('package.json')}`);
    $.log(`${green('Outputting changes to')} ${magenta('CHANGELOG.md')}`);
  }).catch(err => {
    $.log.error(`standard-version failed with message: ${red(err.message)}`);
  });

  await _fakeTimeOut();

  done();
}
standardVers.displayName = 'standard:version';

// Change version number references in project's files
async function changeVersion(done) {
  $.log(`${green('Changing version in')} ${magenta('project\'s files')}`);

  const currentTag = await _getCurrentTag().then(data => data).catch();
  const newVersion = `v${_getPackageJsonVersion()}`;

  exec(`tools/build/change-version.js ${currentTag} ${newVersion}`, (err) => {
    if (err) return done(err);
    done();
  });
}
changeVersion.displayName = 'change:version';

// Commit changes
function commitChanges(done) {
  $.log(`${green('Commit changes...')}`);
  const newVersion = `v${_getPackageJsonVersion()}`;

  src('.')
    .pipe($.git.add())
    .pipe($.git.commit(`chore(release): ${newVersion}`));

  done();
}
commitChanges.displayName = 'commit:changes';

// Push changes
function pushChanges(done) {
  $.log(`${green('Push changes...')}`);

  $.git.push('origin', 'master', (err) => {
    if (err) return done(err);
    done();
  });
}
pushChanges.displayName = 'push:changes';

// Create new tag
function createNewTag(done) {
  const newVersion = `v${_getPackageJsonVersion()}`;
  $.log(`${green('Creating new tag:')} ${magenta(newVersion)}`);

  $.git.tag(`${newVersion}`, `Release ${newVersion}`, (err) => {
    if (err) return done(err);
    done();
  });
}
createNewTag.displayName = 'create:new:tag';

// Push new tag
function pushNewTag(done) {
  $.log(`${green('Pushing new tag to remote')}`);

  $.git.push('origin', 'master', { args: '--follow-tags' }, (err) => {
    if (err) return done(err);
    done();
  });
}
pushNewTag.displayName = 'push:new:tag';

// Publish release to GitHub
function githubRelease(done) {
  $.log(`${green('Publishing release to')} ${magenta('GitHub')}`);
  const newVersion = `v${_getPackageJsonVersion()}`;

  const AUTH = {
    // Set in the settings page of your repository, as a secure variable
    token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN,
    url: 'https://api.github.com/'
  };

  const config = {
    preset: 'angular',
    name: `Release ${newVersion}`
  };

  conventionalGithubReleaser(AUTH, config, done);
}
githubRelease.displayName = 'github:release';

export const release = series(
  standardVers,
  changeVersion,
  commitChanges,
  pushChanges,
  createNewTag,
  pushNewTag,
  githubRelease
);
