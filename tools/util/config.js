/*!
 * StartIt (v1.1.0): tools/util/config.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export const dirs = {
  root: './',
  src: 'src',
  dev: 'tmp',
  prod: 'dist',
  logs: 'logs',
  test: 'test',
  ghpages: '.publish'
};

export const paths = {
  styles: {
    src: `${dirs.src}/scss/`,
    dev: `${dirs.dev}/css/`,
    prod: `${dirs.prod}/css/`
  },
  scripts: {
    src: `${dirs.src}/es6/`,
    dev: `${dirs.dev}/js/`,
    prod: `${dirs.prod}/js/`
  },
  fonts: {
    src: `${dirs.src}/fonts/`,
    dev: `${dirs.dev}/fonts/`,
    prod: `${dirs.prod}/fonts/`
  },
  images: {
    src: `${dirs.src}/images/`,
    dev: `${dirs.dev}/images/`,
    prod: `${dirs.prod}/images/`
  },
  statics: {
    src: `${dirs.src}/static/`,
    dev: `${dirs.dev}/static/`,
    prod: `${dirs.prod}/static/`
  },
  views: {
    src: `${dirs.src}/views/`,
    dev: `${dirs.dev}/`,
    prod: `${dirs.prod}/`,
    data: `${dirs.src}/views/_data/`
  },
  docs: {
    src: `${dirs.root}/docs/`
  },
  logs: {
    gulp: `${dirs.logs}/gulp/`
  }
};

export const fileExt = {
  script: '**/*.es6',
  style: '**/*.scss',
  font: '**/*.{otf,eot,svg,ttf,woff,woff2}',
  image: '**/*.{jpg,jpeg,gif,svg,png}',
  webp: '**/*.{jpg,jpeg,png,webp}',
  pug: '**/*.pug',
  data: '**/*.json',
  docs: '**/*.md',
  static: '**/*.{doc,docx,zip,pdf,js,json,xml}',
  deploy: '**/*',
  css: '**/*.css',
  js: '**/*.js',
  html: '**/*.html'
};