import { URL } from 'url';
import {
    extractTextContent,
    extractAnchorUrl,
    removeNewline,
    parseDate,
    sanitizeDate,
    sanitizeNumber,
} from '../element-helpers';

describe('puppeteer element helpers', () => {

    describe('extractTextContent()', () => {
        it('should extract text content from valid input', () => {
           const input = <Element>{ textContent: 'content' };
           const output = extractTextContent(input);
           expect(output).toEqual('content');
        });

        it('should return undefined from invalid input', () => {
            const input = <Element>{ };
            const output = extractTextContent(input);
            expect(output).toBeUndefined();
        });

        it('should return undefined for null input', () => {
            const output = extractTextContent(null);
            expect(output).toBeUndefined();
        });
    });

    describe('extractAnchorUrl()', () => {
        it('should return the url for valid input', () => {
           const input = jest.fn<Element>(() => ({
               hasAttribute: jest.fn().mockReturnValueOnce(true),
               getAttribute: jest.fn().mockReturnValueOnce('http://aUrl'),
           }));
           const output = extractAnchorUrl(input());
           expect(output).toEqual(new URL('http://aUrl'));
        });

        it('should return the null for valid input, but invalid Url', () => {
            const input = jest.fn<Element>(() => ({
                hasAttribute: jest.fn().mockReturnValueOnce(true),
                getAttribute: jest.fn().mockReturnValueOnce('aUrl'),
            }));
            const output = extractAnchorUrl(input());
            expect(output).toBeUndefined();
        });

        it('should return undefined when no href exists', () => {
           const input = jest.fn<Element>(() => ({
               hasAttribute: jest.fn().mockReturnValueOnce(false),
           }));
           const output = extractAnchorUrl(input());
           expect(output).toBeUndefined();
        });

        it('should return undefined for null input', () => {
            const output = extractAnchorUrl(null);
            expect(output).toBeUndefined();
        });
    });

    describe('removeNewline()', () => {
        it('should remove a newline from input', () => {
            const input = '\n';
            const output = removeNewline(input);
            expect(output).toEqual('');
        });

        it('should remove a carriage return from input', () => {
            const input = '\r';
            const output = removeNewline(input);
            expect(output).toEqual('');
        });

        it('should remove a carriage return and newline from input', () => {
            const input = '\r\n';
            const output = removeNewline(input);
            expect(output).toEqual('');
        });

        it('should remove all newlines from input', () => {
            const input = 'a\nb\nc';
            const output = removeNewline(input);
            expect(output).toEqual('abc');
        });

        it('should return empty string, when input is null', () => {
           expect(removeNewline(null)).toEqual('');
        });
    });

    describe('parseDate()', () => {
        // TODO: Figure out how to test this, if at all
    });

    describe('sanitizeDate()', () => {
        // TODO: Figure out how to test this, if at all
    });

    describe('sanitizeNumber()', () => {
        // TODO: Figure out how to test this, if at all
    });
});