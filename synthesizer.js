#!/usr/bin/env node

const { green, red, cyan, bold, magenta } = require('colors')
const { resolve } = require('path')
const { existsSync: exists } = require('fs')

const log = x => {
	process.stderr.write(`${ x }\n`)
}

const msg = (tag, content) => {
	log(`${ bold(`{${ green(tag) }}`) } ${ content }`)
}
const err = (tag, content) => {
	log(`${ bold(`{${ red(tag) }}`) } ${ content }`)
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

const task_stack = []

const run_task = t => {
	msg(`:${ t }`, 'init')

	task_stack.push(t)
	
	const us = tasks.get(t)

	for (let i = 0; i < us.length; i++) {
		const u = us[i]

		if (u.constructor === String) {
			run_task(u)
		} else {
			u()
		}
	}

	task_stack.pop()

	msg(`:${ t }`, 'done')
}

try {
	requests.forEach(run_task)
	msg('#syn', `ok`)
} catch (e) {
	task_stack.forEach(t => err(`:${ t }`, 'fail'))
	log(magenta(e.stack))
	err('#syn', `bad`)
}

