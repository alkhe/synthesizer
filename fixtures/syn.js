const { register, perform, run, shell, ask } = require('..')
const { readFile } = require('fs')

register('hello', () => {
	run('echo', ['Hello, world!'])
})

register('hello-false', 'hello', () => {
	shell('false')
})

register('throw', () => {
	throw new Error('error')
})

register('login', () => {
	const username = ask('user: ')
	const password = ask('pass: ', { hideEchoBack: true, mask: '' })

	run('echo', [`do something with ${ username }:${ password }`])
})

let env = 'prod'

register('dev', () => {
	env = 'dev'
})

register('start', () => {
	console.log('running in', env, 'mode')
})

register('async', done => {
	readFile('./syn.js', 'utf8', (err, data) => {
		console.log(data)
		done()
	})
})
