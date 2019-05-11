/*!
 * StartIt (v1.1.1): tools/util/config.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export const dirs = {
  root: './',
  src: 'src',
  dev: 'tmp',
  prod: 'dist',
  docs: 'docs',
  logs: 'logs',
  test: 'test',
  ghpages: '.publish'
};

export const paths = {
  styles: {
    src: `${dirs.src}/scss/`,
    all: `${dirs.src}/scss/**/*.scss`,
    dev: `${dirs.dev}/css/`,
    prod: `${dirs.prod}/css/`
  },
  scripts: {
    src: `${dirs.src}/es6/**/*.es6`,
    dev: `${dirs.dev}/js/`,
    prod: `${dirs.prod}/js/`
  },
  fonts: {
    src: `${dirs.src}/fonts/**/*.{otf,eot,svg,ttf,woff,woff2}`,
    dev: `${dirs.dev}/fonts/`,
    prod: `${dirs.prod}/fonts/`
  },
  images: {
    src: {
      image: `${dirs.src}/images/**/*.{jpg,jpeg,gif,svg,png}`,
      webp: `${dirs.src}/images/**/*.{jpg,jpeg,png,webp}`
    },
    dev: `${dirs.dev}/images/`,
    prod: `${dirs.prod}/images/`
  },
  statics: {
    src: `${dirs.src}/static/**/*.{json,xml,svg,ico,png}`,
    dev: `${dirs.dev}/static/`,
    prod: `${dirs.prod}/static/`
  },
  views: {
    src: [ `${dirs.src}/views/**/*.pug`, `!./${dirs.src}/views/**/_*.pug` ],
    all: `${dirs.src}/views/**/*.pug`,
    dev: `${dirs.dev}/`,
    prod: `${dirs.prod}/`,
    data: {
      src: `${dirs.src}/views/data/`,
      all: `${dirs.src}/views/data/**/*.json`
    }
  },
  docs: {
    src: `${dirs.docs}/**/*.md`
  },
  deploy: {
    src: `${dirs.prod}/**/*`
  },
  logs: {
    gulp: `${dirs.logs}/gulp/`
  }
};
