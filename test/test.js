const assert = require('assert');
const rollup = require('rollup');
const webAssembly = require('..');

const executeBundle = (bundle) =>
  bundle.generate({
    format: 'cjs'
  }).then(({code}) => {
    const fn = new Function('assert', 'success', 'fail', code);
    return new Promise((resolve, reject) => fn(assert, resolve, reject));
  });

describe('rollup-plugin-webassembly', () => {

  it('includes and encodes web assembly', () => {
    return rollup
      .rollup({
        input: 'test/fixtures/simple.js',
        plugins: [webAssembly()]
      })
      .then(executeBundle);
  });

  it('supports imports', () => {
    return rollup
      .rollup({
        input: 'test/fixtures/imports.js',
        plugins: [webAssembly()]
      })
      .then(executeBundle);
  });

});
