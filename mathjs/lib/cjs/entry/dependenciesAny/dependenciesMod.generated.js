"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modDependencies = void 0;
var _dependenciesDenseMatrixClassGenerated = require("./dependenciesDenseMatrixClass.generated.js");
var _dependenciesEqualScalarGenerated = require("./dependenciesEqualScalar.generated.js");
var _dependenciesMatrixGenerated = require("./dependenciesMatrix.generated.js");
var _dependenciesTypedGenerated = require("./dependenciesTyped.generated.js");
var _factoriesAny = require("../../factoriesAny.js");
/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */

var modDependencies = {
  DenseMatrixDependencies: _dependenciesDenseMatrixClassGenerated.DenseMatrixDependencies,
  equalScalarDependencies: _dependenciesEqualScalarGenerated.equalScalarDependencies,
  matrixDependencies: _dependenciesMatrixGenerated.matrixDependencies,
  typedDependencies: _dependenciesTypedGenerated.typedDependencies,
  createMod: _factoriesAny.createMod
};
exports.modDependencies = modDependencies;