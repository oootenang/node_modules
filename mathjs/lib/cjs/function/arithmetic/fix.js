"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFixNumber = exports.createFix = void 0;
var _factory = require("../../utils/factory.js");
var _collection = require("../../utils/collection.js");
var _matAlgo12xSfs = require("../../type/matrix/utils/matAlgo12xSfs.js");
var _matAlgo14xDs = require("../../type/matrix/utils/matAlgo14xDs.js");
var name = 'fix';
var dependencies = ['typed', 'Complex', 'matrix', 'ceil', 'floor', 'equalScalar', 'zeros', 'DenseMatrix'];
var createFixNumber = /* #__PURE__ */(0, _factory.factory)(name, ['typed', 'ceil', 'floor'], function (_ref) {
  var typed = _ref.typed,
    ceil = _ref.ceil,
    floor = _ref.floor;
  return typed(name, {
    number: function number(x) {
      return x > 0 ? floor(x) : ceil(x);
    },
    'number, number': function numberNumber(x, n) {
      return x > 0 ? floor(x, n) : ceil(x, n);
    }
  });
});
exports.createFixNumber = createFixNumber;
var createFix = /* #__PURE__ */(0, _factory.factory)(name, dependencies, function (_ref2) {
  var typed = _ref2.typed,
    _Complex = _ref2.Complex,
    matrix = _ref2.matrix,
    ceil = _ref2.ceil,
    floor = _ref2.floor,
    equalScalar = _ref2.equalScalar,
    zeros = _ref2.zeros,
    DenseMatrix = _ref2.DenseMatrix;
  var matAlgo12xSfs = (0, _matAlgo12xSfs.createMatAlgo12xSfs)({
    typed: typed,
    DenseMatrix: DenseMatrix
  });
  var matAlgo14xDs = (0, _matAlgo14xDs.createMatAlgo14xDs)({
    typed: typed
  });
  var fixNumber = createFixNumber({
    typed: typed,
    ceil: ceil,
    floor: floor
  });
  /**
   * Round a value towards zero.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.fix(x)
   *    math.fix(x,n)
   *
   * Examples:
   *
   *    math.fix(3.2)                // returns number 3
   *    math.fix(3.8)                // returns number 3
   *    math.fix(-4.2)               // returns number -4
   *    math.fix(-4.7)               // returns number -4
   *
   *    math.fix(3.12, 1)                // returns number 3.1
   *    math.fix(3.18, 1)                // returns number 3.1
   *    math.fix(-4.12, 1)               // returns number -4.1
   *    math.fix(-4.17, 1)               // returns number -4.1
   *
   *    const c = math.complex(3.22, -2.78)
   *    math.fix(c)                  // returns Complex 3 - 2i
   *    math.fix(c, 1)               // returns Complex 3.2 -2.7i
   *
   *    math.fix([3.2, 3.8, -4.7])      // returns Array [3, 3, -4]
   *    math.fix([3.2, 3.8, -4.7], 1)   // returns Array [3.2, 3.8, -4.7]
   *
   * See also:
   *
   *    ceil, floor, round
   *
   * @param  {number | BigNumber | Fraction | Complex | Array | Matrix} x    Number to be rounded
   * @param  {number | BigNumber | Array} [n=0]                             Number of decimals
   * @return {number | BigNumber | Fraction | Complex | Array | Matrix}     Rounded value
   */
  return typed('fix', {
    number: fixNumber.signatures.number,
    'number, number | BigNumber': fixNumber.signatures['number,number'],
    Complex: function Complex(x) {
      return new _Complex(x.re > 0 ? Math.floor(x.re) : Math.ceil(x.re), x.im > 0 ? Math.floor(x.im) : Math.ceil(x.im));
    },
    'Complex, number': function ComplexNumber(x, n) {
      return new _Complex(x.re > 0 ? floor(x.re, n) : ceil(x.re, n), x.im > 0 ? floor(x.im, n) : ceil(x.im, n));
    },
    'Complex, BigNumber': function ComplexBigNumber(x, bn) {
      var n = bn.toNumber();
      return new _Complex(x.re > 0 ? floor(x.re, n) : ceil(x.re, n), x.im > 0 ? floor(x.im, n) : ceil(x.im, n));
    },
    BigNumber: function BigNumber(x) {
      return x.isNegative() ? ceil(x) : floor(x);
    },
    'BigNumber, number | BigNumber': function BigNumberNumberBigNumber(x, n) {
      return x.isNegative() ? ceil(x, n) : floor(x, n);
    },
    Fraction: function Fraction(x) {
      return x.s < 0 ? x.ceil() : x.floor();
    },
    'Fraction, number | BigNumber': function FractionNumberBigNumber(x, n) {
      return x.s < 0 ? ceil(x, n) : floor(x, n);
    },
    'Array | Matrix': typed.referToSelf(function (self) {
      return function (x) {
        // deep map collection, skip zeros since fix(0) = 0
        return (0, _collection.deepMap)(x, self, true);
      };
    }),
    'Array | Matrix, number | BigNumber': typed.referToSelf(function (self) {
      return function (x, n) {
        // deep map collection, skip zeros since fix(0) = 0
        return (0, _collection.deepMap)(x, function (i) {
          return self(i, n);
        }, true);
      };
    }),
    'number | Complex | Fraction | BigNumber, Array': typed.referToSelf(function (self) {
      return function (x, y) {
        // use matrix implementation
        return matAlgo14xDs(matrix(y), x, self, true).valueOf();
      };
    }),
    'number | Complex | Fraction | BigNumber, Matrix': typed.referToSelf(function (self) {
      return function (x, y) {
        if (equalScalar(x, 0)) return zeros(y.size(), y.storage());
        if (y.storage() === 'dense') {
          return matAlgo14xDs(y, x, self, true);
        }
        return matAlgo12xSfs(y, x, self, true);
      };
    })
  });
});
exports.createFix = createFix;