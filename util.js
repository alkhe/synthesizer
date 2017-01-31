const { green, red, cyan, bold } = require('colors')

const log = x => process.stderr.write(`${ x }\n`)
const prelog = x => process.stderr.write(x)

const msg = (tag, content) => log(`${ bold(`{${ green(tag) }}`) } ${ content }`)
const err = (tag, content) => log(`${ bold(`{${ red(tag) }}`) } ${ content }`)
const prompt = x => prelog(cyan(x))

const default_perform = () => {
	err('syn', '`perform` is meant for composing tasks. specify tasks you want to run on the command line.')
	process.exit()
}

module.exports = { log, prelog, msg, err, prompt, default_perform }
