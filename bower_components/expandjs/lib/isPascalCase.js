/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isString      = require('./isString'),
    isVoid          = require('./isVoid'),
    pascalCaseRegex = require('./pascalCaseRegex'),
    xnor            = require('./xnor');

/**
 * Checks if `value` is a pascal cased `string`.
 *
 * ```js
 * XP.isPascalCase('HelloWorld');
 * // => true
 *
 * XP.isPascalCase('Hello world');
 * // => false
 * ```
 *
 * @function isPascalCase
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a pascal cased `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isPascalCase.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isPascalCase(value, notEmpty) {
    return isString(value) && pascalCaseRegex.test(value) && (isVoid(notEmpty) || xnor(value.length, notEmpty));
};
