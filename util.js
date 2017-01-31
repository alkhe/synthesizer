const { green, red, cyan, bold } = require('colors')

const log = x => process.stderr.write(`${ x }\n`)
const prelog = x => process.stderr.write(x)

const msg = (tag, content) => log(`${ bold(`{${ green(tag) }}`) } ${ content }`)
const err = (tag, content) => log(`${ bold(`{${ red(tag) }}`) } ${ content }`)
const prompt = x => prelog(cyan(x))

module.exports = { log, prelog, msg, err, prompt }
