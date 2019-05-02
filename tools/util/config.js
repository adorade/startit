/*!
 * StartIt (v1.0.0): config.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================= */

const dirs = {
  root: './',
  src: 'src',
  dev: 'tmp',
  prod: 'dist',
  logs: 'logs',
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
  },
  logs: {
    gulp: `${dirs.logs}/gulp/`
  }
};

const fileExt = {
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

const options = {
  entry: {
    cssExternal: 'style**.{scss,sass}',
    cssInline: 'inline**.{scss,sass}',
    css: {
      inline: true,
      external: false
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
    comments: false
  },
  uglify: {
    // option here
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
  watch: {
    delay: 2000
  }
};

export {
  dirs,
  paths,
  fileExt,
  options
};
