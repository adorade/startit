/*!
 * StartIt (v1.1.0): banner.js
 * Copyright (c) 2017 - 2019 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

const pkg = require(`${process.cwd()}/package.json`);

const year = new Date(
  process.env.SOURCE_DATE_EPOCH ? process.env.SOURCE_DATE_EPOCH * 1000 : new Date().getTime()
).getFullYear();

export function banner() {
  let result = '';

  try {
    result = [
      '/*!',
      ` * ${pkg.title} (v${pkg.version}): <%= file.relative %>`,
      ` * ${pkg.description}`,
      ` * Copyright (c) ${year} ${pkg.author}`,
      ` * License under ${pkg.license}`,
      ' * ========================================================================== */',
      '' // new line
    ].join('\n');
  } catch (err) {
    console.error(err);
  }

  return result;
}
