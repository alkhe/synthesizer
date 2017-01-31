const { cyan } = require('colors')
const { execFileSync, spawnSync } = require('child_process')
const rl = require('readline-sync')

rl.setDefaultOptions({ prompt: '' })

const log = console.log.bind(console)

const tasks = new Map

global.__synthesizer__tasks__ = tasks

const merge = (...args) => Object.assign({}, ...args)

const register = (name, ...ts) => {
	tasks.set(name, ts)
}

const run = (file, args = [], options = {}) =>
	spawnSync(file, args, merge({ stdio: [null, 'inherit', 'inherit'] }, options))

const ask = prompt => {
	log(cyan(prompt))
	return rl.prompt()
}

module.exports = {
	register,
	run,
	ask
}

