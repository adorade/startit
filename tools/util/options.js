/*!
 * StartIt (v1.1.0): options.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

const { paths } = require('./config');

const dates = new Date(
  process.env.SOURCE_DATE_EPOCH ? process.env.SOURCE_DATE_EPOCH * 1000 : new Date().getTime()
).toDateString();

export const options = {
  entry: {
    cssExternal: 'style**.{scss,sass}',
    cssInline: 'inline**.{scss,sass}',
    css: {
      inline: false,
      external: true
    }
  },
  styles: {
    failAfterError: false,
    reportOutputDir: paths.logs.gulp,
    reporters: [
      { formatter: 'string', console: true, save: 'styles.txt' }
    ],
    syntax: 'scss'
  },
  sass: {
    outputStyle: 'expanded',
    precision: 6
  },
  autoprefixer: {
    // browsers: [], // see .browserslistrc
    cascade: false
  },
  csso: {
    restructure: false,
    comments: false
  },
  eslint: {
    // see .eslintrc.json
  },
  babel: {
    // see .babelrc.js
  },
  uglify: {
    compress: {
      evaluate: false
    },
    mangle: {
      keep_fnames: true
    }
  },
  images: {
    gif: { interlaced: true },
    jpeg: { progressive: true },
    png: { optimizationLevel: 4 },
    svg: { plugins: [{ removeViewBox: true }] },
    webp: { // https://github.com/imagemin/imagemin-webp#options
      preset: 'default',
      quality: 60
    }
  },
  pug: {
    doctype: 'html',
    pretty: true
  },
  htmlmin: {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeAttributeQuotes: true,
    removeComments: true,
    // removeEmptyAttributes: true,
    removeEmptyElements: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  },
  deploy: {
    // remoteUrl: 'https://github.com/[your-username]/[your-project-name].git',
    // branch: 'gh-pages',
    // cacheDir: '.publish',
    // push: true,
    // force: false,
    message: `Update ${dates}`
  },
  watch: {
    delay: 2000
  }
};
