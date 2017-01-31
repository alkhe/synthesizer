# synthesizer

A lightweight, practical task runner.

## Install

Install `synthesizer` globally:
```sh
$ sudo yarn global add synthesizer
```

Add `synthesizer` to your project:
```sh
$ yarn add synthesizer
```

## Usage

After `synthesizer` has been installed globally and in your project, add a synfile (`syn.js`) to your project:  
**`syn.js`**
```js
const { register } = require('synthesizer')

register('hello', () => {
	console.log('hello, world!')
})
```

Now you can run the `hello` task by typing: (note: try using autocomplete!)
```sh
$ syn hello
```
