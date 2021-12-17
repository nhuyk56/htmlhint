import { Block, Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'email-date-format',
  description: 'updateDayDateformattoAMPScript',
  init(parser, reporter) {
    const tagStack: Array<string> = []
    const tagTarget: Array<string> = ['html', 'body']
    const dateArr: Array<string> = []
    const dateRequired: Array<string> = [
      '%%=format(Now(),"yyyy")=%%',
      '%%=format(Now(),"MMMM")=%%',
    ]

    const getDateRequired = (raw: string): Array<string> => {
      const res: Array<string> = []
      dateRequired.forEach((dateStr) => {
        if (raw.includes(dateStr)) {
          res.push(dateStr)
        }
      })
      return res
    }

    const isBefore = (tag: string): boolean =>
      !tagStack.includes(`${tag}:start`) && !tagStack.includes(`${tag}:end`)

    const isMiddle = (tag: string): boolean =>
      tagStack.includes(`${tag}:start`) && !tagStack.includes(`${tag}:end`)

    const isAfter = (tag: string): boolean =>
      tagStack.includes(`${tag}:start`) && tagStack.includes(`${tag}:end`)

    const onAllListener: Listener = (event) => {
      if (tagTarget.includes(event.tagName)) {
        if (event.type === 'tagstart') {
          tagStack.push(`${event.tagName}:start`)
        }
        if (event.type === 'tagend') {
          tagStack.push(`${event.tagName}:end`)
        }
      }

      if (isMiddle('html') && isMiddle('body') && event.type === 'text') {
        getDateRequired(event.raw).forEach((dateStr) => {
          dateArr.push(dateStr)
        })
      }

      if (isAfter('html') && isBefore('body')) {
        reporter.error(
          '<body> must be present in <html> tag.',
          event.line,
          event.col,
          this,
          event.raw
        )
        parser.removeListener('all', onAllListener)
      }
      if (isMiddle('html') && isAfter('body') && dateArr.length === 0) {
        reporter.error(
          `<body> tag missing ${dateRequired.join(' or ')}`,
          event.line,
          event.col,
          this,
          event.raw
        )
        parser.removeListener('all', onAllListener)
      }
    }
    parser.addListener('all', onAllListener)
  },
} as Rule
