[![GitHub package version](https://img.shields.io/github/package-json/v/adorade/startit.svg?color=green&logo=github&style=flat-square)](https://github.com/adorade/startit/blob/master/package.json)
[![license](https://img.shields.io/github/license/adorade/startit.svg?longCache=true&style=flat-square)](https://mit-license.org)
[![devDependencies Status](https://img.shields.io/david/dev/adorade/startit.svg?longCache=true&style=flat-square)](https://david-dm.org/adorade/startit?type=dev)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/adorade/startit/issues)
[![Travis (.org) branch](https://img.shields.io/travis/adorade/startit/master.svg?logo=travis&style=flat-square)](https://travis-ci.org/adorade/startit)
[![Greenkeeper badge](https://badges.greenkeeper.io/adorade/startit.svg?style=flat-square)](https://greenkeeper.io/)

# StartIt

## Description

> ✔ StartIt is a simple framework enabling faster delivery of projects and/or automatic deployment of [GitHub Pages](https://pages.github.com/)...

This provides an example project which automates tasks with gulp including:

* compiling Sass to CSS code
* transpiling ES6 to cross-browser-compatible ES5 code
* outputing sourcemaps for use in browser devtools
* code linting and validation
* minifying for production
* automatically appending vendor prefixes
* optimizing images
* publishing fonts to web
* generating HTML from templates and content files
* handling and inlining assets
* live-reloading files in a browser when source files change
* deploying to GitHub Pages

## Installation

To install on any Linux, Mac OS or Windows system, ensure [Node.js](https://nodejs.org/) is installed then clone the repository:

```bash
git clone https://github.com/adorade/startit.git
```

Navigate to the folder:

```bash
cd startit
```

Install dependencies:

```bash
# yarn
yarn global gulp-cli
yarn install

# npm
npm i gulp-cli -g
npm i
```

Note that module versions have been fixed to guarantee compatibility. Run `yarn outdated` (or `npm outdated`) and update `package.json` as necessary.

## Usage

Run in live-reloading development mode:

```bash
yarn run start
# or
gulp
# or
gulp dev
```

Navigate to `http://localhost:1234/` or the `External` URL if accessing from another device.

Find full list of tasks:

```bash
gulp -T
# or
gulp -T --tasks-depth 0
```

## Build production

Set `NODE_ENV` to `production` so Gulp tasks produce final code, i.e. minify files, and disable sourcemap generation.

```bash
yarn run build
# or
gulp build --production
```

Set `NODE_ENV` to `production` manually depending on your OS:

Linux/Mac OS:

```bash
NODE_ENV=production
gulp build
```

(or inline `NODE_ENV=production gulp build`)

Windows Powershell:

```powershell
$env:NODE_ENV="production"
gulp build
```

Windows legacy command line:

```cmd
set NODE_ENV=production
gulp build
```

## Deploy to Github Pages

To automatically deploy your project to [GitHub Pages](https://pages.github.com/) and make it available at `https://[your-username].github.io/[your-project-name]` use:

```bash
yarn run deploy
# or
gulp deploy
```

## LICENSE

Code released under the [MIT License](https://github.com/adorade/startit/blob/master/LICENSE)
