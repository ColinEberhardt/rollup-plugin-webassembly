# deprecated!!! rollup-plugin-webassembly

**This plugin is deprecated** - I've joined forces with an author of a similar plugin, to work on an official plugin https://github.com/rollup/rollup-plugin-wasm

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![travis](https://travis-ci.org/ColinEberhardt/rollup-plugin-webassembly.svg?branch=master)

A rollup plugin that inlines (base64 encoded) and imports WebAssembly modules.

~~~javascript
import wasm from './hello.wasm';

wasm()
  .then(instance =>
    console.log(instance.exports.main())
  );
~~~

This plugin is particularly useful if you want to distribute a library or framework that mixes WebAssembly and JavaScript code. Note, the WebAssembly JavaScript API compiles WebAssembly modules asynchronously, hence the above code returns the module via a Promise.

# Installation

Install via npm:
~~~
npm install --save-dev rollup-plugin-webassembly
~~~

# Configuration

Simply add the plugin to your rollup config. Any imported file with the `wasm` extension will be processed by this plugin.

~~~javascript
import { rollup } from 'rollup';
import webAssembly from 'rollup-plugin-webassembly';

rollup({
  entry: 'main.js',
  plugins: [
    webAssembly()
  ]
});
~~~

This plugin also supports the standard include / exclude pattern:

~~~javascript
rollup({
  entry: 'main.js',
  plugins: [
    webAssembly({
      // All wasm files will be parsed by default,
      // but you can also specifically include/exclude files
      include: 'node_modules/**',  // Default: undefined
      exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
    })
  ]
});
~~~

# Example

Given the following simple C file, compiled to wasm (using emscripten, or the online [WasmFiddle](https://wasdk.github.io/WasmFiddle//) tool):

~~~c
int main() {
  return 42;
}
~~~

The plugin will look for any wasm imports. For any it finds, the wasm file is inlined as a base64 encoded string (which means it will be ~33% larger than the original). The string is decoded and asynchronously compiled into a wasm module, which is returned by the import"

~~~javascript
import wasm from './hello.wasm';

wasm()
  .then(instance =>
    console.log(instance.exports.main())
  );
~~~

If your wasm module requires imports, these can be supplied as the first argument to the wasm function:

~~~javascript
import wasm from './hello.wasm';

wasm({
    env: {
      log: (value) => console.log(value) }
    }
  })
  .then(instance => {
    ...
  });
~~~
