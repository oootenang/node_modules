"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createKron = void 0;
var _array = require("../../utils/array.js");
var _factory = require("../../utils/factory.js");
var name = 'kron';
var dependencies = ['typed', 'matrix', 'multiplyScalar'];
var createKron = /* #__PURE__ */(0, _factory.factory)(name, dependencies, function (_ref) {
  var typed = _ref.typed,
    matrix = _ref.matrix,
    multiplyScalar = _ref.multiplyScalar;
  /**
     * Calculates the kronecker product of 2 matrices or vectors.
     *
     * NOTE: If a one dimensional vector / matrix is given, it will be
     * wrapped so its two dimensions.
     * See the examples.
     *
     * Syntax:
     *
     *    math.kron(x, y)
     *
     * Examples:
     *
     *    math.kron([[1, 0], [0, 1]], [[1, 2], [3, 4]])
     *    // returns [ [ 1, 2, 0, 0 ], [ 3, 4, 0, 0 ], [ 0, 0, 1, 2 ], [ 0, 0, 3, 4 ] ]
     *
     *    math.kron([1,1], [2,3,4])
     *    // returns [ [ 2, 3, 4, 2, 3, 4 ] ]
     *
     * See also:
     *
     *    multiply, dot, cross
     *
     * @param  {Array | Matrix} x     First vector
     * @param  {Array | Matrix} y     Second vector
     * @return {Array | Matrix}       Returns the kronecker product of `x` and `y`
     */
  return typed(name, {
    'Matrix, Matrix': function MatrixMatrix(x, y) {
      return matrix(_kron(x.toArray(), y.toArray()));
    },
    'Matrix, Array': function MatrixArray(x, y) {
      return matrix(_kron(x.toArray(), y));
    },
    'Array, Matrix': function ArrayMatrix(x, y) {
      return matrix(_kron(x, y.toArray()));
    },
    'Array, Array': _kron
  });

  /**
     * Calculate the kronecker product of two matrices / vectors
     * @param {Array} a  First vector
     * @param {Array} b  Second vector
     * @returns {Array} Returns the kronecker product of x and y
     * @private
     */
  function _kron(a, b) {
    // Deal with the dimensions of the matricies.
    if ((0, _array.arraySize)(a).length === 1) {
      // Wrap it in a 2D Matrix
      a = [a];
    }
    if ((0, _array.arraySize)(b).length === 1) {
      // Wrap it in a 2D Matrix
      b = [b];
    }
    if ((0, _array.arraySize)(a).length > 2 || (0, _array.arraySize)(b).length > 2) {
      throw new RangeError('Vectors with dimensions greater then 2 are not supported expected ' + '(Size x = ' + JSON.stringify(a.length) + ', y = ' + JSON.stringify(b.length) + ')');
    }
    var t = [];
    var r = [];
    return a.map(function (a) {
      return b.map(function (b) {
        r = [];
        t.push(r);
        return a.map(function (y) {
          return b.map(function (x) {
            return r.push(multiplyScalar(y, x));
          });
        });
      });
    }) && t;
  }
});
exports.createKron = createKron;