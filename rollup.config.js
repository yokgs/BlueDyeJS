import typescript from 'rollup-plugin-typescript';
const dts= require("rollup-plugin-dts");
const name = require('./package.json').main.replace(/\.js$/, '')
const license = require("rollup-plugin-license");
const pkg = require("./package.json");
const commonjs = require("@rollup/plugin-commonjs");
const buble = require("@rollup/plugin-buble");
const terser = require("@rollup/plugin-terser");
let path = require("path");
const esbuild = require("rollup-plugin-esbuild");
const json = require("@rollup/plugin-json");
export default [{
  input: './src/core.ts',
  output: [
    {
      file: `${name}.cjs`,
      format: 'cjs',
      sourcemap: true,
      declarations: './dist/bluedye.d.ts'
    },
    {
      file: `${name}.mjs`,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    commonjs(),
      json(),
      buble({
        transforms: { dangerousForOf: true },
      })
  ]
}, 
{
  input: './src/core.ts',
  plugins: [ typescript({
    declaration: true
  }),dts],
  output: {
    file: `${name}.d.ts`,
    format: 'es',
  },

}
];


/*const json = require("@rollup/plugin-json");
//
const license = require("rollup-plugin-license");
const pkg = require("./package.json");
const commonjs = require("@rollup/plugin-commonjs");
const buble = require("@rollup/plugin-buble");
const terser = require("@rollup/plugin-terser");
const dts = require("rollup-plugin-dts");
let path = require("path");
const esbuild = require("rollup-plugin-esbuild");

const name = require('./package.json').main.replace(/\.js$/, '')

const bundle = config => ({
  ...config,
  input: 'src/core.ts',
  external: id => false,
})

module.exports=[
  bundle({
    plugins: [esbuild],
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `${name}.mjs`,
        format: 'es',
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts],
    output: {
      file: `${name}.d.ts`,
      format: 'es',
    },
  }),
]/*
module.exports=[
  {
    input: "prebuild/core.js",
    plugins: [
      commonjs(),
      json(),
      buble({
        transforms: { dangerousForOf: true },
      }),
      
      license({
        sourcemap: true,
        banner: {
          content: {
            file: path.join(__dirname, "LICENSE"),
          },
        },
      }),
    ],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
  {
    input: "prebuild/core.js",
    plugins: [
      commonjs(),
      json(),
      buble({
        transforms: { dangerousForOf: true },
      }),
      terser(),
      license({
        sourcemap: true,
        banner: {
          content: {
            file: path.join(__dirname, "LICENSE"),
          },
        },
      }),
    ],
    output: [
      { file: pkg.main.replace(".js",".min.js"), format: "cjs" },
      { file: pkg.module.replace(".mjs",".min.mjs"), format: "es" },
    ],
  },
  {
    input: './dist/dts/core.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts],
  },
];*/