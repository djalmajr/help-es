#!/usr/bin/env node

import esbuild from 'esbuild';
import { globPlugin } from 'esbuild-plugin-glob';

const args = process.argv.slice(2);
const isBool = (val) => /^(true|false)$/.test(val);
const options = args.reduce((res, arg) => {
  const [key, val] = arg.split('=');
  return { ...res, [key]: isBool(val) ? JSON.parse(val) : val };
}, {});

/** @type {import('esbuild').BuildOptions } */
const config = {
  ...options,
  entryNames: '[dir]/[name]',
  entryPoints: ['src/!(*.d).ts'],
  bundle: true,
  format: 'esm',
  outbase: 'src',
  outdir: 'lib',
  plugins: [
    globPlugin(),
    {
      name: 'add-ext',
      setup(build) {
        build.onResolve({ filter: /.*/ }, (args) => {
          if (args.importer && args.path.includes('./')) {
            return { path: args.path + '.js', external: true };
          }
        });
      },
    },
  ],
};

esbuild.build(config).catch(() => process.exit(1));
