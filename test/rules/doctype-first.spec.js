const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'doctype-first'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Doctype not be first should result in an error', () => {
    const code = '<html></html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(1)
  })

  it('Doctype be first should not result in an error', () => {
    const code = '<!DOCTYPE HTML><html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })
})
