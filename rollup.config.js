import typescript from 'rollup-plugin-typescript3'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
// import postcss from 'rollup-plugin-postcss-modules'
import postcss from 'rollup-plugin-postcss'
import url from 'rollup-plugin-url'
import pkg from './package.json'

const extensions = [
	'.js', '.jsx', '.ts', '.tsx',
];

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.module,
      format: 'es', // Other options include `cjs`, etc...
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      modules: false,
    }),
    url(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs({extensions}),
  ]
}
