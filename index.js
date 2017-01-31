const { cyan } = require('colors')
const { execFileSync, spawnSync } = require('child_process')
const rl = require('readline-sync')

rl.setDefaultOptions({ prompt: '' })

const log = x => {
	process.stderr.write(`${ x }\n`)
}

const prelog = x => {
	process.stderr.write(x)
}

const tasks = new Map

global.__synthesizer__tasks__ = tasks

const merge = (...args) => Object.assign({}, ...args)

const register = (name, ...ts) => {
	tasks.set(name, ts)
}

const run = (file, args = [], options = {}) => {
	const execution = spawnSync(file, args, merge({ stdio: 'inherit' }, options))
	if (execution.status !== 0) {
		throw new Error(`${ file }[${ args.join(', ') }] exited with status ${ execution.status }`)
	}
	return execution
}

const ask = prompt => {
	if (prompt.length > 0) prelog(cyan(prompt))
	return rl.prompt()
}

module.exports = {
	register,
	run,
	ask
}

