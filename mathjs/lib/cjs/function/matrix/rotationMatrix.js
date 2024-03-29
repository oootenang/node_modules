"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRotationMatrix = void 0;
var _is = require("../../utils/is.js");
var _factory = require("../../utils/factory.js");
var name = 'rotationMatrix';
var dependencies = ['typed', 'config', 'multiplyScalar', 'addScalar', 'unaryMinus', 'norm', 'matrix', 'BigNumber', 'DenseMatrix', 'SparseMatrix', 'cos', 'sin'];
var createRotationMatrix = /* #__PURE__ */(0, _factory.factory)(name, dependencies, function (_ref) {
  var typed = _ref.typed,
    config = _ref.config,
    multiplyScalar = _ref.multiplyScalar,
    addScalar = _ref.addScalar,
    unaryMinus = _ref.unaryMinus,
    norm = _ref.norm,
    BigNumber = _ref.BigNumber,
    matrix = _ref.matrix,
    DenseMatrix = _ref.DenseMatrix,
    SparseMatrix = _ref.SparseMatrix,
    cos = _ref.cos,
    sin = _ref.sin;
  /**
   * Create a 2-dimensional counter-clockwise rotation matrix (2x2) for a given angle (expressed in radians).
   * Create a 2-dimensional counter-clockwise rotation matrix (3x3) by a given angle (expressed in radians) around a given axis (1x3).
   *
   * Syntax:
   *
   *    math.rotationMatrix(theta)
   *    math.rotationMatrix(theta, format)
   *    math.rotationMatrix(theta, [v])
   *    math.rotationMatrix(theta, [v], format)
   *
   * Examples:
   *
   *    math.rotationMatrix(math.pi / 2)                      // returns [[0, -1], [1, 0]]
   *    math.rotationMatrix(math.bignumber(1))                // returns [[bignumber(cos(1)), bignumber(-sin(1))], [bignumber(sin(1)), bignumber(cos(1))]]
   *    math.rotationMatrix(math.complex(1 + i))              // returns [[cos(1 + i), -sin(1 + i)], [sin(1 + i), cos(1 + i)]]
   *    math.rotationMatrix(math.unit('1rad'))                // returns [[cos(1), -sin(1)], [sin(1), cos(1)]]
   *
   *    math.rotationMatrix(math.pi / 2, [0, 1, 0])           // returns [[0, 0, 1], [0, 1, 0], [-1, 0, 0]]
   *    math.rotationMatrix(math.pi / 2, matrix([0, 1, 0]))   // returns matrix([[0, 0, 1], [0, 1, 0], [-1, 0, 0]])
   *
   *
   * See also:
   *
   *    matrix, cos, sin
   *
   *
   * @param {number | BigNumber | Complex | Unit} theta    Rotation angle
   * @param {Array | Matrix} [v]                           Rotation axis
   * @param {string} [format]                              Result Matrix storage format
   * @return {Array | Matrix}                              Rotation matrix
   */

  return typed(name, {
    '': function _() {
      return config.matrix === 'Matrix' ? matrix([]) : [];
    },
    string: function string(format) {
      return matrix(format);
    },
    'number | BigNumber | Complex | Unit': function numberBigNumberComplexUnit(theta) {
      return _rotationMatrix2x2(theta, config.matrix === 'Matrix' ? 'dense' : undefined);
    },
    'number | BigNumber | Complex | Unit, string': function numberBigNumberComplexUnitString(theta, format) {
      return _rotationMatrix2x2(theta, format);
    },
    'number | BigNumber | Complex | Unit, Array': function numberBigNumberComplexUnitArray(theta, v) {
      var matrixV = matrix(v);
      _validateVector(matrixV);
      return _rotationMatrix3x3(theta, matrixV, undefined);
    },
    'number | BigNumber | Complex | Unit, Matrix': function numberBigNumberComplexUnitMatrix(theta, v) {
      _validateVector(v);
      var storageType = v.storage() || (config.matrix === 'Matrix' ? 'dense' : undefined);
      return _rotationMatrix3x3(theta, v, storageType);
    },
    'number | BigNumber | Complex | Unit, Array, string': function numberBigNumberComplexUnitArrayString(theta, v, format) {
      var matrixV = matrix(v);
      _validateVector(matrixV);
      return _rotationMatrix3x3(theta, matrixV, format);
    },
    'number | BigNumber | Complex | Unit, Matrix, string': function numberBigNumberComplexUnitMatrixString(theta, v, format) {
      _validateVector(v);
      return _rotationMatrix3x3(theta, v, format);
    }
  });

  /**
   * Returns 2x2 matrix of 2D rotation of angle theta
   *
   * @param {number | BigNumber | Complex | Unit} theta  The rotation angle
   * @param {string} format                              The result Matrix storage format
   * @returns {Matrix}
   * @private
   */
  function _rotationMatrix2x2(theta, format) {
    var Big = (0, _is.isBigNumber)(theta);
    var minusOne = Big ? new BigNumber(-1) : -1;
    var cosTheta = cos(theta);
    var sinTheta = sin(theta);
    var data = [[cosTheta, multiplyScalar(minusOne, sinTheta)], [sinTheta, cosTheta]];
    return _convertToFormat(data, format);
  }
  function _validateVector(v) {
    var size = v.size();
    if (size.length < 1 || size[0] !== 3) {
      throw new RangeError('Vector must be of dimensions 1x3');
    }
  }
  function _mul(array) {
    return array.reduce(function (p, curr) {
      return multiplyScalar(p, curr);
    });
  }
  function _convertToFormat(data, format) {
    if (format) {
      if (format === 'sparse') {
        return new SparseMatrix(data);
      }
      if (format === 'dense') {
        return new DenseMatrix(data);
      }
      throw new TypeError("Unknown matrix type \"".concat(format, "\""));
    }
    return data;
  }

  /**
   * Returns a 3x3 matrix of rotation of angle theta around vector v
   *
   * @param {number | BigNumber | Complex | Unit} theta The rotation angle
   * @param {Matrix} v                                  The rotation axis vector
   * @param {string} format                             The storage format of the resulting matrix
   * @returns {Matrix}
   * @private
   */
  function _rotationMatrix3x3(theta, v, format) {
    var normV = norm(v);
    if (normV === 0) {
      throw new RangeError('Rotation around zero vector');
    }
    var Big = (0, _is.isBigNumber)(theta) ? BigNumber : null;
    var one = Big ? new Big(1) : 1;
    var minusOne = Big ? new Big(-1) : -1;
    var vx = Big ? new Big(v.get([0]) / normV) : v.get([0]) / normV;
    var vy = Big ? new Big(v.get([1]) / normV) : v.get([1]) / normV;
    var vz = Big ? new Big(v.get([2]) / normV) : v.get([2]) / normV;
    var c = cos(theta);
    var oneMinusC = addScalar(one, unaryMinus(c));
    var s = sin(theta);
    var r11 = addScalar(c, _mul([vx, vx, oneMinusC]));
    var r12 = addScalar(_mul([vx, vy, oneMinusC]), _mul([minusOne, vz, s]));
    var r13 = addScalar(_mul([vx, vz, oneMinusC]), _mul([vy, s]));
    var r21 = addScalar(_mul([vx, vy, oneMinusC]), _mul([vz, s]));
    var r22 = addScalar(c, _mul([vy, vy, oneMinusC]));
    var r23 = addScalar(_mul([vy, vz, oneMinusC]), _mul([minusOne, vx, s]));
    var r31 = addScalar(_mul([vx, vz, oneMinusC]), _mul([minusOne, vy, s]));
    var r32 = addScalar(_mul([vy, vz, oneMinusC]), _mul([vx, s]));
    var r33 = addScalar(c, _mul([vz, vz, oneMinusC]));
    var data = [[r11, r12, r13], [r21, r22, r23], [r31, r32, r33]];
    return _convertToFormat(data, format);
  }
});
exports.createRotationMatrix = createRotationMatrix;