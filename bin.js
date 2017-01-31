#!/usr/bin/env node

const { log, msg, err } = require('./util')

const requests = process.argv.slice(2)

if (requests.includes('-v')) {
	msg('syn', `synthesizer@${ require('./package.json').version }`)
	process.exit()
}

const { cyan, magenta } = require('colors')
const { join } = require('path')
const { existsSync: exists } = require('fs')

const cwd = process.cwd()
const synfile = join(cwd, 'syn.js')

msg('syn', `starting in ${ cyan(cwd) }`)

if (!exists(synfile)) {
	err('syn', `syn.js not found`)
	process.exit()
}

const tasks = new Map
let run_task = () => {
	err('syn', '`perform` is meant for composing tasks. specify tasks you want to run on the command line.')
	process.exit()
}

global.__synthesizer__tasks__ = tasks
global.__synthesizer__perform__ = (...args) => {
	args.forEach(run_task)
}

require(synfile)
msg('syn', `using ${ cyan(synfile) }`)

const task_stack = []

tasks.set('#', requests)

run_task = t => {
	msg(`:${ t }`, 'init')

	task_stack.push(t)
	
	if (!tasks.has(t)) throw new Error(`task ${ t } not found`)
	const components = tasks.get(t)

	for (let i = 0; i < components.length; i++) {
		const u = components[i]

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
	run_task('#')
} catch (e) {
	log(magenta(e.stack))
	for (let i = task_stack.length - 1; i >= 0; i--) {
		err(`:${ task_stack[i] }`, `fail`)
	}
}

