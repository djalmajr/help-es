import esbuild from 'esbuild';
import { globPlugin } from 'esbuild-plugin-glob';

const args = process.argv.slice(2);

const isBool = (val) => /^(true|false)$/.test(val);

const options = args.reduce((res, arg) => {
  const [key, val] = arg.split('=');

  return { ...res, [key]: isBool(val) ? JSON.parse(val) : val };
}, {});

const formats = {
  '.js': 'cjs',
  '.mjs': 'esm',
  '.m.js': 'esm',
};

Object.entries(formats).forEach(([ext, fmt]) => {
  /** @type {import('esbuild').BuildOptions } */
  const config = {
    ...options,
    entryNames: '[dir]/[name]',
    entryPoints: ['src/!(*.d).ts'],
    bundle: true,
    format: fmt,
    outbase: 'src',
    outdir: 'dist',
    outExtension: { '.js': ext },
    plugins: [
      globPlugin(),
      {
        name: 'add-ext',
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) => {
            if (args.importer) {
              return {
                path: args.path + ext,
                external: true,
              };
            }
          });
        },
      },
    ],
  };

  esbuild.build(config).catch(() => process.exit(1));
});
