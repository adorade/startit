/*!
 * StartIt (v1.0.0): config.js
 * Copyright (c) 2017 - 2018 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */

const dirs = {
  root: './',
  src: 'src',
  dev: 'tmp',
  prod: 'dist',
  test: 'test',
  ghpages: '.publish'
};

const paths = {
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
  static: {
    src: `${dirs.src}/static/`,
    dev: `${dirs.dev}/static/`,
    prod: `${dirs.prod}/static/`
  },
  views: {
    src: `${dirs.src}/views/`,
    dev: `${dirs.dev}/`,
    prod: `${dirs.prod}/`,
    data: `${dirs.src}/views/_data/`,
    component: `${dirs.src}/views/_component/`,
    layout: `${dirs.src}/views/_layout`
  },
  docs: {
    src: `${dirs.src}/docs/`
  }
};

const options = {
  entry: {
    cssExternal: 'style**.{scss,sass}',
    cssInline: 'inline**.{scss,sass}',
    css: {
      inline: true,
      external: false
    }
  },
  fileExt: {
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
  },
  watch: {
    interval: 1000, // default 100
    awaitWriteFinish: true // default false
  }
};

export {
  dirs,
  paths,
  options
};
