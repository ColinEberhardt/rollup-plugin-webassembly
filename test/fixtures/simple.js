import wasm from './simple.wasm';

wasm()
  .then(instance => {
    assert.equal(instance.exports.main(), 42);
    success();
  })
  .catch(err => fail(err));
