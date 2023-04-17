#!/usr/bin/env node

import esbuild from 'esbuild';
import { globPlugin } from 'esbuild-plugin-glob';

const args = process.argv.slice(2);
const isBool = (val) => /^(true|false)$/.test(val);
const formats = { '.cjs': 'cjs', '.js': 'esm' };
const options = args.reduce((res, arg) => {
  const [key, val] = arg.split('=');
  return { ...res, [key]: isBool(val) ? JSON.parse(val) : val };
}, {});

Object.entries(formats).forEach(([ext, fmt]) => {
  /** @type {import('esbuild').BuildOptions } */
  const config = {
    ...options,
    entryNames: '[dir]/[name]',
    entryPoints: ['src/!(*.d).ts'],
    bundle: true,
    format: fmt,
    outbase: 'src',
    outdir: 'lib',
    outExtension: { '.js': ext },
    plugins: [
      globPlugin(),
      {
        name: 'add-ext',
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) => {
            if (args.importer) {
              return { path: args.path + ext, external: true };
            }
          });
        },
      },
    ],
  };

  esbuild.build(config).catch(() => process.exit(1));
});
