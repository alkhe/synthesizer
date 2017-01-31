#!/usr/bin/env node

const tab = require('tabtab')({
	name: 'syn'
})

tab.on('syn', (data, done) => {
	console.log(data)
	done(null, ['asd', 'ddd'])
})

tab.start()

