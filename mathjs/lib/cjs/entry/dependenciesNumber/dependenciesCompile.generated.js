"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileDependencies = void 0;
var _dependenciesParseGenerated = require("./dependenciesParse.generated.js");
var _dependenciesTypedGenerated = require("./dependenciesTyped.generated.js");
var _factoriesNumber = require("../../factoriesNumber.js");
/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */

var compileDependencies = {
  parseDependencies: _dependenciesParseGenerated.parseDependencies,
  typedDependencies: _dependenciesTypedGenerated.typedDependencies,
  createCompile: _factoriesNumber.createCompile
};
exports.compileDependencies = compileDependencies;