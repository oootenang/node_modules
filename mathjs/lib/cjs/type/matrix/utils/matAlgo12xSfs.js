"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMatAlgo12xSfs = void 0;
var _factory = require("../../../utils/factory.js");
var name = 'matAlgo12xSfs';
var dependencies = ['typed', 'DenseMatrix'];
var createMatAlgo12xSfs = /* #__PURE__ */(0, _factory.factory)(name, dependencies, function (_ref) {
  var typed = _ref.typed,
    DenseMatrix = _ref.DenseMatrix;
  /**
   * Iterates over SparseMatrix S nonzero items and invokes the callback function f(Sij, b).
   * Callback function invoked MxN times.
   *
   *
   *          ┌  f(Sij, b)  ; S(i,j) !== 0
   * C(i,j) = ┤
   *          └  f(0, b)    ; otherwise
   *
   *
   * @param {Matrix}   s                 The SparseMatrix instance (S)
   * @param {Scalar}   b                 The Scalar value
   * @param {Function} callback          The f(Aij,b) operation to invoke
   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Sij)
   *
   * @return {Matrix}                    DenseMatrix (C)
   *
   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97626813
   */
  return function matAlgo12xSfs(s, b, callback, inverse) {
    // sparse matrix arrays
    var avalues = s._values;
    var aindex = s._index;
    var aptr = s._ptr;
    var asize = s._size;
    var adt = s._datatype;

    // sparse matrix cannot be a Pattern matrix
    if (!avalues) {
      throw new Error('Cannot perform operation on Pattern Sparse Matrix and Scalar value');
    }

    // rows & columns
    var rows = asize[0];
    var columns = asize[1];

    // datatype
    var dt;
    // callback signature to use
    var cf = callback;

    // process data types
    if (typeof adt === 'string') {
      // datatype
      dt = adt;
      // convert b to the same datatype
      b = typed.convert(b, dt);
      // callback
      cf = typed.find(callback, [dt, dt]);
    }

    // result arrays
    var cdata = [];

    // workspaces
    var x = [];
    // marks indicating we have a value in x for a given column
    var w = [];

    // loop columns
    for (var j = 0; j < columns; j++) {
      // columns mark
      var mark = j + 1;
      // values in j
      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        // row
        var r = aindex[k];
        // update workspace
        x[r] = avalues[k];
        w[r] = mark;
      }
      // loop rows
      for (var i = 0; i < rows; i++) {
        // initialize C on first column
        if (j === 0) {
          // create row array
          cdata[i] = [];
        }
        // check sparse matrix has a value @ i,j
        if (w[i] === mark) {
          // invoke callback, update C
          cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
        } else {
          // dense matrix value @ i, j
          cdata[i][j] = inverse ? cf(b, 0) : cf(0, b);
        }
      }
    }

    // return dense matrix
    return new DenseMatrix({
      data: cdata,
      size: [rows, columns],
      datatype: dt
    });
  };
});
exports.createMatAlgo12xSfs = createMatAlgo12xSfs;