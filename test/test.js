const HTMLHint = require('../dist/htmlhint.js').HTMLHint
const code = '<html><head></head><body></body></html>'
const messages = HTMLHint.verify(code, { 'title-require2': true })
console.log(messages)
