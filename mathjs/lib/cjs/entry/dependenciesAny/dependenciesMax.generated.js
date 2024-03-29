"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maxDependencies = void 0;
var _dependenciesLargerGenerated = require("./dependenciesLarger.generated.js");
var _dependenciesNumericGenerated = require("./dependenciesNumeric.generated.js");
var _dependenciesTypedGenerated = require("./dependenciesTyped.generated.js");
var _factoriesAny = require("../../factoriesAny.js");
/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */

var maxDependencies = {
  largerDependencies: _dependenciesLargerGenerated.largerDependencies,
  numericDependencies: _dependenciesNumericGenerated.numericDependencies,
  typedDependencies: _dependenciesTypedGenerated.typedDependencies,
  createMax: _factoriesAny.createMax
};
exports.maxDependencies = maxDependencies;