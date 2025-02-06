import { IParser, SingleParser, TupleParser } from '@masala/parser'
import { TakeItem } from './src/take'

export declare function take(
  items: TakeItem[],
  separator?: IParser<any>
): TupleParser<any>

declare function inChars(
  strings: string[]
): import('@masala/parser').SingleParser<any>

declare function tryAll(array: IParser<any>[]): IParser<any>

declare function thenAll(parsers: IParser<any>[]): TupleParser<any>

declare function thenAll(parsers: IParser<any>[]): TupleParser<any>

declare function json(): SingleParser<any>

export declare const X: {
  take: typeof take
  inChars: typeof inChars
  tryAll: typeof tryAll
  thenAll: typeof thenAll
  json: typeof json
  split: (delim: IParser<any>) => SingleParser<string[]>
}
