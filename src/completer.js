import { default_perform } from './util'
const { resolve } = require('path')
const { existsSync: exists } = require('fs')

const cwd = process.cwd()
const synfile = resolve(cwd, 'syn.js')

if (exists(synfile)) {
	global.__synthesizer__tasks__ = new Map
	global.__synthesizer__perform__ = () => {}

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

