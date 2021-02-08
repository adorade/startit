[![GitHub package version](https://img.shields.io/github/package-json/v/adorade/startit.svg?color=green&logo=github)](https://github.com/adorade/startit/blob/main/package.json)
[![license](https://img.shields.io/github/license/adorade/startit.svg)](https://mit-license.org)
[![devDependencies Status](https://img.shields.io/david/dev/adorade/startit.svg)](https://david-dm.org/adorade/startit?type=dev)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/adorade/startit/issues)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-green.svg)](https://conventionalcommits.org)
[![GitHub Actions status](https://github.com/adorade/startit/workflows/Node%20CI/badge.svg)](https://github.com/adorade/startit/actions)

# StartIt

## Description

> ✔ Simple starter project enabling faster delivery of projects and/or:
>
> * automatic deployment of [GitHub Pages](https://pages.github.com/)
> * publish release to [GitHub](https://github.com/)

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

## Requirements

This project have some requerements you need to meet in order to compile it.

* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/en/)
* [Gulp](http://gulpjs.com/)

## Installation

In order to start using the project you need to clone it to your pc with the git command, replace `[your-project]` with your project name:

```bash
git clone https://github.com/adorade/startit.git [your-project]
```

Navigate to the folder:

```bash
cd [your-project]
```

Install dependencies:

```bash
yarn install
```

Note that module versions have been fixed to guarantee compatibility. Run `yarn outdated` and update `package.json` as necessary.

## How to use

To start using it, the only thing you need to do is open the project on you code editor of choice and code. To compile and live preview all your changes you have some command that will help you. Here are the list of commands you should know.

Every command have to be executed on the root directory of the project using the gulp command like `gulp cleaner` or `gulp build`:

Task        | Description
------------|---------
**cleaner** | Remove all the compiled files
**linter**  | Lint styles, scripts and pug files
**styles**  | Compile the Sass styles
**scripts** | Compile the JavaScript files
**fonts**   | Copy fonts
**statics** | Copy static files
**images**  | Optimize images
**pages**   | Compile the Pug templates
**serve**   | Start the server and watch for any changes
**build**   | Build the project
**dev**     | Compile and watch for changes
**deploy**  | Deploy files to Github Pages
**release** | Publish release to GitHub
**default** | Default gulp task
**checks**  | Check gulp configuration
**help**    | Print help message

Run `gulp --tasks` to see all available gulp tasks.

If you are in development, the `gulp dev` command is the best choice for you. Go to the project folder in the console and execute `gulp dev`, it will compile the project and start a server that will refresh every time you change something in the code.  
Gulp will be watching for changes and will tell you how to access the project from local and public url.  
Every browser that point to that url will be auto refreshed. As an extra feature for testing purpose any interaction on one browser will be reflected on any others. Try it on a phone, tablet and pc at the same time.

## Structure

The project have a very simple and flexible structure. If the default place for any file or directory needs to be moved, be sure to update to the new position on the `tool/util/config.js` file.

```bash
├── dist -> All the compiled files will be placed here (Production)
├── logs -> Logs files
├── src  -> Source files for the project
│   ├── es6     -> Scripts
│   ├── fonts   -> Fonts
│   ├── images  -> Images
│   ├── scss    -> Sass
│   ├── static  -> Favicons...
│   ├── vendors -> Vendors folder for all the dependencies
│   └── views   -> Templates directory for Pug files
├── test -> Tests Files
├── tmp  -> All the compiled files will be placed here (Development)
├── tools     -> Project tools and configuration
│   ├── build -> files for build
│   ├── tasks -> tasks files for gulp
│   └── util  -> config and options for project
├── package.json -> NodeJS configuration file
├── gulpfile.esm.js -> Gulp tasks
├── README.md         -> README
└── ... config files for packages
```

All the files in the `dist` and `tmp` folders will be auto-generated by the different tasks when the project compiles. Be sure to not modify any file manually in these folders because changes will be replaced on the compile process.

## Configuration

This project have some nice configuration options to meet all you needs. To configure you need to edit the following files and change any value you need:

* `tool/util/banner.js` - banner for scripts and styles files
* `tool/util/config.js` - project configuration
* `tool/util/options.js` - options for plugins

After each change you've made, check with `gulp checks` if everything is in order and there are no errors.  
Every aspect of this configuration is described in the file so that you know the options.

## Build development

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
gulp build --production && gulp deploy
```

## Publish release to GitHub

To publish release to [GitHub](https://github.com/) use:

```bash
yarn run release
# or
gulp release
```

## LICENSE

This project is licensed under the [MIT License](https://github.com/adorade/startit/blob/main/LICENSE)
