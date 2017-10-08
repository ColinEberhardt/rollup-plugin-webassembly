const createFilter = require('rollup-pluginutils').createFilter;
const readFileSync = require('fs').readFileSync;

const ext = /\.wasm$/;

function webassembly(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'webassembly',

    transform(wasmCode, id) {
      if (!ext.test(id)) {
        return null;
      }
      if (!filter(id)) {
        return null;
      }

      const encoded = Buffer.from(wasmCode, 'binary').toString('base64')

      const code = `
        var encoded = "${encoded}";

        function asciiToBinary(str) {
          if (typeof atob === 'function') {
            return atob(str)
          } else {
            return new Buffer(str, 'base64').toString('binary');
          }
        }

        function decode(encoded) {
          var binaryString =  asciiToBinary(encoded);
          var bytes = new Uint8Array(binaryString.length);
          for (var i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
          }
          return bytes.buffer;
        }

        export default (importObject) =>  WebAssembly.instantiate(decode(encoded), importObject)
          .then(r => r.instance);
        `;

      return {
        code
      };
    }
  };
}

module.exports = webassembly;
