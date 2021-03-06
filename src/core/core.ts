import HTMLParser from './htmlparser'
import Reporter from './reporter'
import * as HTMLRules from './rules'
import { Hint, Rule, Ruleset } from './types'

export interface FormatOptions {
  colors?: boolean
  indent?: number
}

class HTMLHintCore {
  public rules: { [id: string]: Rule } = {}
  public readonly defaultRuleset: Ruleset = {
    'alt-require': true,
    'attr-lowercase': true,
    'attr-no-duplication': true,
    'attr-no-unnecessary-whitespace': true,
    'attr-unsafe-chars': true,
    'attr-value-double-quotes': true,
    'attr-value-not-empty': true,
    'attr-whitespace': true,
    'doctype-first': true,
    'doctype-html5': true,
    'empty-tag-not-self-closed': true,
    'head-script-disabled': true,
    'id-class-ad-disabled': true,
    'id-unique': true,
    'input-requires-label': true,
    'script-disabled': true,
    'spec-char-escape': true,
    'src-not-empty': true,
    'tag-pair': true,
    'tagname-lowercase': true,
    'tagname-specialchars': true,
    'title-require': true,
    'email-date-format': true,
  }

  public addRule(rule: Rule) {
    this.rules[rule.id] = rule
  }

  public verify(html: string, ruleset: Ruleset = this.defaultRuleset) {
    if (Object.keys(ruleset).length === 0) {
      ruleset = this.defaultRuleset
    }

    // parse inline ruleset
    html = html.replace(
      /^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i,
      (all, strRuleset: string) => {
        // For example:
        // all is '<!-- htmlhint alt-require:true-->'
        // strRuleset is 'alt-require:true'
        strRuleset.replace(
          /(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g,
          (all, ruleId: string, value: string | undefined) => {
            // For example:
            // all is 'alt-require:true'
            // ruleId is 'alt-require'
            // value is 'true'

            ruleset[ruleId] =
              value !== undefined && value.length > 0 ? JSON.parse(value) : true

            return ''
          }
        )

        return ''
      }
    )

    const parser = new HTMLParser()
    const reporter = new Reporter(html, ruleset)

    const rules = this.rules
    let rule: Rule

    for (const id in ruleset) {
      rule = rules[id]
      if (rule !== undefined && ruleset[id] !== false) {
        rule.init(parser, reporter, ruleset[id])
      }
    }

    parser.parse(html)

    return reporter.messages
  }

  public format(arrMessages: Hint[], options: FormatOptions = {}) {
    const arrLogs: string[] = []
    const colors = {
      white: '',
      grey: '',
      red: '',
      reset: '',
    }

    if (options.colors) {
      colors.white = '\x1b[37m'
      colors.grey = '\x1b[90m'
      colors.red = '\x1b[31m'
      colors.reset = '\x1b[39m'
    }

    const indent = options.indent || 0

    arrMessages.forEach((hint) => {
      const leftWindow = 40
      const rightWindow = leftWindow + 20
      let evidence = hint.evidence
      const line = hint.line
      const col = hint.col
      const evidenceCount = evidence.length
      let leftCol = col > leftWindow + 1 ? col - leftWindow : 1
      let rightCol =
        evidence.length > col + rightWindow ? col + rightWindow : evidenceCount

      if (col < leftWindow + 1) {
        rightCol += leftWindow - col + 1
      }

      evidence = evidence.replace(/\t/g, ' ').substring(leftCol - 1, rightCol)

      // add ...
      if (leftCol > 1) {
        evidence = `...${evidence}`
        leftCol -= 3
      }
      if (rightCol < evidenceCount) {
        evidence += '...'
      }

      // show evidence
      arrLogs.push(
        `${colors.white + repeatStr(indent)}L${line} |${
          colors.grey
        }${evidence}${colors.reset}`
      )

      // show pointer & message
      let pointCol = col - leftCol
      // add double byte character
      // eslint-disable-next-line no-control-regex
      const match = evidence.substring(0, pointCol).match(/[^\u0000-\u00ff]/g)
      if (match !== null) {
        pointCol += match.length
      }

      arrLogs.push(
        `${
          colors.white +
          repeatStr(indent) +
          repeatStr(String(line).length + 3 + pointCol)
        }^ ${colors.red}${hint.message} (${hint.rule.id})${colors.reset}`
      )
    })

    return arrLogs
  }
}

// repeat string
function repeatStr(n: number, str?: string) {
  return new Array(n + 1).join(str || ' ')
}

export const HTMLHint = new HTMLHintCore()

Object.keys(HTMLRules).forEach((key) => {
  // TODO: need a fix
  // @ts-expect-error
  HTMLHint.addRule(HTMLRules[key])
})

export { HTMLRules, Reporter, HTMLParser }
