#!/usr/bin/env node

const { green, red, cyan } = require('colors')
const { resolve } = require('path')
const { existsSync: exists } = require('fs')

const log = console.log.bind(console)
const msg = (tag, content) => {
	log(`<${ green(tag) }> ${ content }`)
}
const err = (tag, content) => {
	log(`<${ red(tag) }> ${ content }`)
}

const cwd = process.cwd()
msg('#syn', `starting in ${ cyan(cwd) }`)

const synfile = resolve(cwd, 'syn.js')

if (!exists(synfile)) {
	err('#syn', `syn.js not found`)
	process.exit()
}

require(synfile)
msg('#syn', `using in ${ cyan(synfile) }`)

const requests = process.argv.slice(2)
const tasks = __synthesizer__tasks__

const run_task = t => {
	msg(`:${ t }`, 'init')
	
	tasks.get(t).forEach(u => {
		if (u.constructor === String) {
			run_task(u)
		} else {
			u()
		}
	})

	msg(`:${ t }`, 'done')
}

requests.forEach(run_task)

msg('#syn', `ok`)
