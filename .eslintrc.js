/*!
 * StartIt (v1.2.1): .eslintrc.js
 * Copyright (c) 2017-21 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    es6: true,
    jquery: true,
    node: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "array-bracket-spacing": ["error", "always", { objectsInArrays: false }],
    "block-spacing": "error",
    "comma-dangle": "error",
    "comma-style": ["error", "last"],
    indent: ["error", 2, {
      VariableDeclarator: { var: 2, let: 2, const: 3 },
      SwitchCase: 1
    }],
    "no-floating-decimal": "error",
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1, maxBOF: 1 }],
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    quotes: ["error", "single", { avoidEscape: true }],
    semi: ["error", "never"]
  },
  overrides: [
    {
      files: [
        "gulpfile.esm.js",
        "tools/**/*.js",
        "jest.config.js"
      ],
      rules: {
        semi: ["error", "always"]
      }
    },
    {
      files: [
        "jest.config.js"
      ],
      rules: {
        "comma-dangle": "off",
        quotes: ["error", "double"]
      }
    },
    {
      files: [
        "banner.js"
      ],
      rules: {
        "no-console": "off"
      }
    }
  ]
}
