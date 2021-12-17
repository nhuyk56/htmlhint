"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLParser = exports.Reporter = exports.HTMLRules = exports.HTMLHint = void 0;
const htmlparser_1 = require("./htmlparser");
exports.HTMLParser = htmlparser_1.default;
const reporter_1 = require("./reporter");
exports.Reporter = reporter_1.default;
const HTMLRules = require("./rules");
exports.HTMLRules = HTMLRules;
class HTMLHintCore {
    constructor() {
        this.rules = {};
        this.defaultRuleset = {
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
        };
    }
    addRule(rule) {
        this.rules[rule.id] = rule;
    }
    verify(html, ruleset = this.defaultRuleset) {
        if (Object.keys(ruleset).length === 0) {
            ruleset = this.defaultRuleset;
        }
        html = html.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i, (all, strRuleset) => {
            strRuleset.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g, (all, ruleId, value) => {
                ruleset[ruleId] =
                    value !== undefined && value.length > 0 ? JSON.parse(value) : true;
                return '';
            });
            return '';
        });
        const parser = new htmlparser_1.default();
        const reporter = new reporter_1.default(html, ruleset);
        const rules = this.rules;
        let rule;
        for (const id in ruleset) {
            rule = rules[id];
            if (rule !== undefined && ruleset[id] !== false) {
                rule.init(parser, reporter, ruleset[id]);
            }
        }
        parser.parse(html);
        return reporter.messages;
    }
    format(arrMessages, options = {}) {
        const arrLogs = [];
        const colors = {
            white: '',
            grey: '',
            red: '',
            reset: '',
        };
        if (options.colors) {
            colors.white = '\x1b[37m';
            colors.grey = '\x1b[90m';
            colors.red = '\x1b[31m';
            colors.reset = '\x1b[39m';
        }
        const indent = options.indent || 0;
        arrMessages.forEach((hint) => {
            const leftWindow = 40;
            const rightWindow = leftWindow + 20;
            let evidence = hint.evidence;
            const line = hint.line;
            const col = hint.col;
            const evidenceCount = evidence.length;
            let leftCol = col > leftWindow + 1 ? col - leftWindow : 1;
            let rightCol = evidence.length > col + rightWindow ? col + rightWindow : evidenceCount;
            if (col < leftWindow + 1) {
                rightCol += leftWindow - col + 1;
            }
            evidence = evidence.replace(/\t/g, ' ').substring(leftCol - 1, rightCol);
            if (leftCol > 1) {
                evidence = `...${evidence}`;
                leftCol -= 3;
            }
            if (rightCol < evidenceCount) {
                evidence += '...';
            }
            arrLogs.push(`${colors.white + repeatStr(indent)}L${line} |${colors.grey}${evidence}${colors.reset}`);
            let pointCol = col - leftCol;
            const match = evidence.substring(0, pointCol).match(/[^\u0000-\u00ff]/g);
            if (match !== null) {
                pointCol += match.length;
            }
            arrLogs.push(`${colors.white +
                repeatStr(indent) +
                repeatStr(String(line).length + 3 + pointCol)}^ ${colors.red}${hint.message} (${hint.rule.id})${colors.reset}`);
        });
        return arrLogs;
    }
}
function repeatStr(n, str) {
    return new Array(n + 1).join(str || ' ');
}
exports.HTMLHint = new HTMLHintCore();
Object.keys(HTMLRules).forEach((key) => {
    exports.HTMLHint.addRule(HTMLRules[key]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXFDO0FBaUxQLHFCQWpMdkIsb0JBQVUsQ0FpTHVCO0FBaEx4Qyx5Q0FBaUM7QUFnTGIsbUJBaExiLGtCQUFRLENBZ0xhO0FBL0s1QixxQ0FBb0M7QUErSzNCLDhCQUFTO0FBdktsQixNQUFNLFlBQVk7SUFBbEI7UUFDUyxVQUFLLEdBQTJCLEVBQUUsQ0FBQTtRQUN6QixtQkFBYyxHQUFZO1lBQ3hDLGFBQWEsRUFBRSxJQUFJO1lBQ25CLGdCQUFnQixFQUFFLElBQUk7WUFDdEIscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixnQ0FBZ0MsRUFBRSxJQUFJO1lBQ3RDLG1CQUFtQixFQUFFLElBQUk7WUFDekIsMEJBQTBCLEVBQUUsSUFBSTtZQUNoQyxzQkFBc0IsRUFBRSxJQUFJO1lBQzVCLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsZUFBZSxFQUFFLElBQUk7WUFDckIsZUFBZSxFQUFFLElBQUk7WUFDckIsMkJBQTJCLEVBQUUsSUFBSTtZQUNqQyxzQkFBc0IsRUFBRSxJQUFJO1lBQzVCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsV0FBVyxFQUFFLElBQUk7WUFDakIsc0JBQXNCLEVBQUUsSUFBSTtZQUM1QixpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsZUFBZSxFQUFFLElBQUk7WUFDckIsVUFBVSxFQUFFLElBQUk7WUFDaEIsbUJBQW1CLEVBQUUsSUFBSTtZQUN6QixzQkFBc0IsRUFBRSxJQUFJO1lBQzVCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLG1CQUFtQixFQUFFLElBQUk7U0FDMUIsQ0FBQTtJQThISCxDQUFDO0lBNUhRLE9BQU8sQ0FBQyxJQUFVO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQTtJ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