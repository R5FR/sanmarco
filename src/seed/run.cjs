/**
 * Seed runner — patches @next/env resolution for tsx compatibility
 * Usage: node --import tsx src/seed/run.cjs
 */
const Module = require('module')
const originalResolve = Module._resolveFilename

// Intercept @next/env resolution — tsx transforms it incorrectly
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request === '@next/env') {
    // Return a fake module path — we'll handle it below
    return require.resolve('./next-env-shim.cjs')
  }
  return originalResolve.call(this, request, parent, isMain, options)
}

// Now import the actual seed
require('./index.ts')
