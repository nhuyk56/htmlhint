const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'tag-pair'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('No end tag should result in an error', () => {
    let code = '<ul><li></ul><span>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(9)
    expect(messages[1].rule.id).to.be(ruleId)
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(20)

    code = '<div></div>\r\n<div>aaa'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(2)
    expect(messages[0].col).to.be(9)
  })

  it('No start tag should result in an error', () => {
    const code = '</div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(1)
  })

  it('Tag be paired should not result in an error', () => {
    const code = '<p>aaa</p>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })
})
