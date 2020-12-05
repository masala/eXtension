import {IParser, TupleParser} from '@masala/parser'
import {TakeItem} from './dist/typescript/src/x'

export declare function take(items: TakeItem[], separator?: IParser<any>): TupleParser<any>;

declare function inChars(strings: string[]): import("@masala/parser").SingleParser<any>;

declare function tryAll(array: IParser<any>[]): IParser<any>;

declare function thenAll(parsers: IParser<any>[]): TupleParser<any>;

export declare const X: {
    take: typeof take;
    inChars: typeof inChars;
    tryAll: typeof tryAll;
    thenAll: typeof thenAll;
};
