const { prompt } = require('./util')
const { execSync, spawnSync } = require('child_process')
const rl = require('readline-sync')

rl.setDefaultOptions({ prompt: '' })

const merge = (...args) => Object.assign({}, ...args)

const register = (name, ...ts) => {
	__synthesizer__tasks__.set(name, ts)
}

const perform = (...args) => __synthesizer__perform__(...args)

const run = (file, args = [], options = {}) => {
	const execution = spawnSync(file, args, merge({ stdio: 'inherit' }, options))
	if (execution.status !== 0) {
		throw new Error(`${ file }[${ args.join(', ') }] exited with status ${ execution.status }`)
	}
	return execution
}

const shell = (cmd, options = {}) => execSync(cmd, merge({ stdio: 'inherit', options }))

const ask = (question, options = {}) => {
	if (question.length > 0) prompt(question)
	return rl.prompt(options)
}

module.exports = {
	register,
	perform,
	run,
	shell,
	ask
}

