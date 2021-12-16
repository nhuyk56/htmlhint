import { Block, Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'custom-tag-require',
  description: '<custom> must be present (ynn).',
  init(parser, reporter) {
    let bodyBegin = false
    let hasCustom = false

    const onTagStart: Listener = (event) => {
      const tagName = event.tagName.toLowerCase()
      if (tagName === 'body') {
        bodyBegin = true
      } else if (tagName === 'custom' && bodyBegin) {
        hasCustom = true
      }
    }

    const onTagEnd: Listener = (event) => {
      const tagName = event.tagName.toLowerCase()
      if (hasCustom && tagName === 'custom') {
        // TODO: fix this error
        // @ts-expect-error
        const lastEvent: Block = event.lastEvent
        if (
          lastEvent.type !== 'text' ||
          (lastEvent.type === 'text' && /^\s*$/.test(lastEvent.raw) === true)
        ) {
          reporter.error(
            '<custom></custom> must not be empty (ynn).',
            event.line,
            event.col,
            this,
            event.raw
          )
        }
      } else if (tagName === 'body') {
        if (hasCustom === false) {
          reporter.error(
            '<custom> must be present (ynn).',
            event.line,
            event.col,
            this,
            event.raw
          )
        }

        parser.removeListener('tagstart', onTagStart)
        parser.removeListener('tagend', onTagEnd)
      }
    }

    parser.addListener('tagstart', onTagStart)
    parser.addListener('tagend', onTagEnd)
  },
} as Rule
