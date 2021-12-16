"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'custom-tag-require',
    description: '<custom> must be present (ynn).',
    init(parser, reporter) {
        let bodyBegin = false;
        let hasCustom = false;
        const onTagStart = (event) => {
            const tagName = event.tagName.toLowerCase();
            if (tagName === 'body') {
                bodyBegin = true;
            }
            else if (tagName === 'custom' && bodyBegin) {
                hasCustom = true;
            }
        };
        const onTagEnd = (event) => {
            const tagName = event.tagName.toLowerCase();
            if (hasCustom && tagName === 'custom') {
                const lastEvent = event.lastEvent;
                if (lastEvent.type !== 'text' ||
                    (lastEvent.type === 'text' && /^\s*$/.test(lastEvent.raw) === true)) {
                    reporter.error('<custom></custom> must not be empty (ynn).', event.line, event.col, this, event.raw);
                }
            }
            else if (tagName === 'body') {
                if (hasCustom === false) {
                    reporter.error('<custom> must be present (ynn).', event.line, event.col, this, event.raw);
                }
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagend', onTagEnd);
            }
        };
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXRhZy1yZXF1aXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvY3VzdG9tLXRhZy1yZXF1aXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esa0JBQWU7SUFDYixFQUFFLEVBQUUsb0JBQW9CO0lBQ3hCLFdBQVcsRUFBRSxpQ0FBaUM7SUFDOUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQTtRQUNyQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUE7UUFFckIsTUFBTSxVQUFVLEdBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtnQkFDdEIsU0FBUyxHQUFHLElBQUksQ0FBQTthQUNqQjtpQkFBTSxJQUFJLE9BQU8sS0FBSyxRQUFRLElBQUksU0FBUyxFQUFFO2dCQUM1QyxTQUFTLEdBQUcsSUFBSSxDQUFBO2FBQ2pCO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsTUFBTSxRQUFRLEdBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLElBQUksU0FBUyxJQUFJLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBR3JDLE1BQU0sU0FBUyxHQUFVLEtBQUssQ0FBQyxTQUFTLENBQUE7Z0JBQ3hDLElBQ0UsU0FBUyxDQUFDLElBQUksS0FBSyxNQUFNO29CQUN6QixDQUFDLFNBQVMsQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUNuRTtvQkFDQSxRQUFRLENBQUMsS0FBSyxDQUNaLDRDQUE0QyxFQUM1QyxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtpQkFDRjthQUNGO2lCQUFNLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtnQkFDN0IsSUFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO29CQUN2QixRQUFRLENBQUMsS0FBSyxDQUNaLGlDQUFpQyxFQUNqQyxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtpQkFDRjtnQkFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQTtnQkFDN0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7YUFDMUM7UUFDSCxDQUFDLENBQUE7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUMxQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0NBQ00sQ0FBQSJ9