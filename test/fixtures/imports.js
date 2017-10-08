import wasm from './imports.wasm';

let callbackValue = 0;

wasm({
    env: {
      callback: (value) => { callbackValue = value; }
    }
  })
  .then(instance => {
    assert.equal(instance.exports.main(), 42);
    assert.equal(callbackValue, 53);
    success();
  })
  .catch(err => fail(err));
