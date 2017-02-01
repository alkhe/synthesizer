import { log, msg, err, default_perform } from './util'

const requests = process.argv.slice(2)

if (requests.includes('-v')) {
	log(`synthesizer@${ require('../package.json').version }`)
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
let run_task = default_perform
global.__synthesizer__tasks__ = tasks
global.__synthesizer__perform__ = (...args) => {
	args.forEach(run_task)
}

require(synfile)
msg('syn', `using ${ cyan(synfile) }`)

const task_stack = []

tasks.set('#', requests)

run_task = t => new Promise((res, rej) => {
	msg(`:${ t }`, 'init')

	task_stack.push(t)
	
	if (!tasks.has(t)) throw new Error(`task ${ t } not found`)
	const components = tasks.get(t)

	let i = 0

	function loop() {
		if (i < components.length) {
			const u = components[i]

			i++

			const p =
				u.constructor === String
					? run_task(u)
					: new Promise((res, rej) => {
						if (u.length === 0) {
							// value or promise
							res(u())
						} else {
							// callback
							u(res)
						}
					})

			p.then(loop).catch(rej)
		} else {
			task_stack.pop()
			msg(`:${ t }`, 'done')
			res()
		}
	}

	loop()
})

run_task('#')
	.catch(e => {
		log(magenta(e.stack))
		for (let i = task_stack.length - 1; i >= 0; i--) {
			err(`:${ task_stack[i] }`, `fail`)
		}
	})
