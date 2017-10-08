import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/rollup-plugin-webassembly.js',
    format: 'cjs'
  },
  plugins: [
    babel()
  ]
}
