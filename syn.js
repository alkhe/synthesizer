const { register } = require('synthesizer')
const { resolve } = require('path')
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')

const plugins = [
	babel({
		presets: [
			['env', { targets: { node: 'current' }, modules: false }],
			'babili'
		],
		babelrc: false,
		exclude: 'node_modules/**'
	})
]

register('build', 'build-cli', 'build-completer', 'build-index')

register('build-cli', () =>
	rollup.rollup({
		entry: './src/cli.js',
		plugins
	}).then(bundle => {
		bundle.write({
			banner: '#!/usr/bin/env node\n',
			format: 'cjs',
			dest: './bin/cli.js'
		})
	})
)

register('build-completer', () =>
	rollup.rollup({
		entry: './src/completer.js',
		plugins
	}).then(bundle => {
		bundle.write({
			banner: '#!/usr/bin/env node\n',
			format: 'cjs',
			dest: './bin/completer.js'
		})
	})
)

register('build-index', () =>
	rollup.rollup({
		entry: './src/index.js',
		plugins
	}).then(bundle => {
		bundle.write({
			format: 'cjs',
			dest: './index.js'
		})
	})
)
