"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'email-date-format',
    description: 'updateDayDateformattoAMPScript',
    init(parser, reporter) {
        const tagStack = [];
        const tagTarget = ['html', 'body'];
        const dateArr = [];
        const dateRequired = [
            '%%=format(Now(),"yyyy")=%%',
            '%%=format(Now(),"MMMM")=%%',
        ];
        const getDateRequired = (raw) => {
            const res = [];
            dateRequired.forEach((dateStr) => {
                if (raw.includes(dateStr)) {
                    res.push(dateStr);
                }
            });
            return res;
        };
        const isBefore = (tag) => !tagStack.includes(`${tag}:start`) && !tagStack.includes(`${tag}:end`);
        const isMiddle = (tag) => tagStack.includes(`${tag}:start`) && !tagStack.includes(`${tag}:end`);
        const isAfter = (tag) => tagStack.includes(`${tag}:start`) && tagStack.includes(`${tag}:end`);
        const onAllListener = (event) => {
            if (tagTarget.includes(event.tagName)) {
                if (event.type === 'tagstart') {
                    tagStack.push(`${event.tagName}:start`);
                }
                if (event.type === 'tagend') {
                    tagStack.push(`${event.tagName}:end`);
                }
            }
            if (isMiddle('html') && isMiddle('body') && event.type === 'text') {
                getDateRequired(event.raw).forEach((dateStr) => {
                    dateArr.push(dateStr);
                });
            }
            if (isMiddle('html') && isAfter('body') && dateArr.length === 0) {
                reporter.error(`<body> tag missing ${dateRequired.join(' or ')}`, event.line, event.col, this, event.raw);
                parser.removeListener('all', onAllListener);
            }
        };
        parser.addListener('all', onAllListener);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9lbWFpbC1kYXRlLWZvcm1hdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLG1CQUFtQjtJQUN2QixXQUFXLEVBQUUsZ0NBQWdDO0lBQzdDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLFFBQVEsR0FBa0IsRUFBRSxDQUFBO1FBQ2xDLE1BQU0sU0FBUyxHQUFrQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUNqRCxNQUFNLE9BQU8sR0FBa0IsRUFBRSxDQUFBO1FBQ2pDLE1BQU0sWUFBWSxHQUFrQjtZQUNsQyw0QkFBNEI7WUFDNUIsNEJBQTRCO1NBQzdCLENBQUE7UUFFRCxNQUFNLGVBQWUsR0FBRyxDQUFDLEdBQVcsRUFBaUIsRUFBRTtZQUNyRCxNQUFNLEdBQUcsR0FBa0IsRUFBRSxDQUFBO1lBQzdCLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDL0IsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2lCQUNsQjtZQUNILENBQUMsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxHQUFHLENBQUE7UUFDWixDQUFDLENBQUE7UUFFRCxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVcsRUFBVyxFQUFFLENBQ3hDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQTtRQUV4RSxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVcsRUFBVyxFQUFFLENBQ3hDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUE7UUFFdkUsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFXLEVBQVcsRUFBRSxDQUN2QyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQTtRQUV0RSxNQUFNLGFBQWEsR0FBYSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3hDLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3JDLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7b0JBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxRQUFRLENBQUMsQ0FBQTtpQkFDeEM7Z0JBQ0QsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDM0IsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLE1BQU0sQ0FBQyxDQUFBO2lCQUN0QzthQUNGO1lBRUQsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO2dCQUNqRSxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUM3QyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUN2QixDQUFDLENBQUMsQ0FBQTthQUNIO1lBRUQsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUMvRCxRQUFRLENBQUMsS0FBSyxDQUNaLHNCQUFzQixZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQ2pELEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO2dCQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFBO2FBQzVDO1FBQ0gsQ0FBQyxDQUFBO1FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDMUMsQ0FBQztDQUNNLENBQUEifQ==