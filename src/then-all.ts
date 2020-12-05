import {
    F,
    TupleParser,
    IParser,
     tuple
} from '@masala/parser'

export function thenAll(parsers: IParser<any>[]):TupleParser<any>{

    const startEmptyTuple = F.nop().map(()=>tuple());
    return parsers.reduce( (p, next)=> p.then(next), startEmptyTuple) as TupleParser<any>;
}