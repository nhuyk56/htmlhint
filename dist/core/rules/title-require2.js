"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'title-require2',
    description: '<title>1 must be present in <head> tag.',
    init(parser, reporter) {
        let headBegin = false;
        let hasTitle = false;
        const onTagStart = (event) => {
            const tagName = event.tagName.toLowerCase();
            if (tagName === 'head') {
                headBegin = true;
            }
            else if (tagName === 'title' && headBegin) {
                hasTitle = true;
            }
        };
        const onTagEnd = (event) => {
            const tagName = event.tagName.toLowerCase();
            if (hasTitle && tagName === 'title') {
                const lastEvent = event.lastEvent;
                if (lastEvent.type !== 'text' ||
                    (lastEvent.type === 'text' && /^\s*$/.test(lastEvent.raw) === true)) {
                    reporter.error('<title></title> must not be empty.', event.line, event.col, this, event.raw);
                }
            }
            else if (tagName === 'head') {
                if (hasTitle === false) {
                    reporter.error('<title>2 must be present in <head> tag.', event.line, event.col, this, event.raw);
                }
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagend', onTagEnd);
            }
        };
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUtcmVxdWlyZTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90aXRsZS1yZXF1aXJlMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixXQUFXLEVBQUUseUNBQXlDO0lBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUE7UUFDckIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFBO1FBRXBCLE1BQU0sVUFBVSxHQUFhLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDckMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUMzQyxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7Z0JBQ3RCLFNBQVMsR0FBRyxJQUFJLENBQUE7YUFDakI7aUJBQU0sSUFBSSxPQUFPLEtBQUssT0FBTyxJQUFJLFNBQVMsRUFBRTtnQkFDM0MsUUFBUSxHQUFHLElBQUksQ0FBQTthQUNoQjtRQUNILENBQUMsQ0FBQTtRQUVELE1BQU0sUUFBUSxHQUFhLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUMzQyxJQUFJLFFBQVEsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO2dCQUduQyxNQUFNLFNBQVMsR0FBVSxLQUFLLENBQUMsU0FBUyxDQUFBO2dCQUN4QyxJQUNFLFNBQVMsQ0FBQyxJQUFJLEtBQUssTUFBTTtvQkFDekIsQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsRUFDbkU7b0JBQ0EsUUFBUSxDQUFDLEtBQUssQ0FDWixvQ0FBb0MsRUFDcEMsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7aUJBQ0Y7YUFDRjtpQkFBTSxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7Z0JBQzdCLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTtvQkFDdEIsUUFBUSxDQUFDLEtBQUssQ0FDWix5Q0FBeUMsRUFDekMsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7aUJBQ0Y7Z0JBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7Z0JBQzdDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2FBQzFDO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDeEMsQ0FBQztDQUNNLENBQUEifQ==