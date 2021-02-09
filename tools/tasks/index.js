/*!
 * StartIt (v1.2.1): tools/tasks/index.js
 * Copyright (c) 2017-21 Adorade (https://adorade.ro)
 * Licensed under MIT
 * ========================================================================== */

export { checks } from './checks';                                  // Checks
export { cleanDev, cleanProd, cleanLogs, cleaner } from './clean';  // Cleaners
export { lintScss, lintJs, lintPug, linter } from './lint';         // Linters
export { compile, styles } from './styles';                         // Styles
export { transpile, scripts } from './scripts';                     // Scripts
export { fonts } from './fonts';                                    // Statics
export { statics } from './statics';                                // Statics
export { image, convert, images } from './images';                  // Images
export { pug, pages } from './pug';                                 // Pages
export { serve } from './serve';                                    // Serve and Watch
export { deploy } from './deploy';                                  // Deploy
export { help } from './help';                                      // Help
export { release } from './release';                                // Release
