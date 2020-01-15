import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
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
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    external({
      includeDependencies: true,
    }),
    postcss({
      modules: false,
    }),
    url(),
    resolve(),
    typescript(),
    commonjs({extensions}),
  ]
}
