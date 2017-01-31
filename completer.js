#!/usr/bin/env node

const { resolve } = require('path')
const { existsSync: exists } = require('fs')

const cwd = process.cwd()
const synfile = resolve(cwd, 'syn.js')

if (exists(synfile)) {
	require(synfile)

	const tab = require('tabtab')({
		name: 'syn',
		cache: 'false'
	})

	tab.on('syn', (data, done) => {
		done(null, Array.from(__synthesizer__tasks__.keys()))
	})

	tab.start()
}

