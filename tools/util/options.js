/*!
 * StartIt (v1.2.1): tools/util/options.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

import { paths } from './config';

const dates = new Date(
  process.env.SOURCE_DATE_EPOCH ? process.env.SOURCE_DATE_EPOCH * 1000 : new Date().getTime()
).toDateString();

export const opts = {
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
  terser: {
    compress: {
      evaluate: false
    },
    output: {
      comments: false
    },
    keep_classnames: true,
    keep_fnames: true
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
