import {C, F, IParser, TupleParser} from '@masala/parser'

type Modifier = '?' | '*' | '+'
type TakeItemArray = [IParser<any>, Modifier] | [string, Modifier]
type TakeItem = string | IParser<any> | TakeItemArray;

export function take(items: TakeItem[], separator ?: IParser<any>): TupleParser<any> {

    if (items.length < 2) {
        throw "take array must have at least two items"
    }

    let parser: IParser<any> = F.nop();
    if (!separator){

    }


    items.forEach(item => {
        let next: IParser<any>;
        if (typeof item === 'string') {
            next = takeString(item);
        } else if (Array.isArray(item)) {
            if (typeof item[0] === 'string') {
                next = takeArrayString(item[0], item[1])
            } else {
                next = takeArrayParser(item[0], item[1])
            }
        } else {
            next = item;
        }

        if (!separator){
            separator = C.charIn(' \r\n\f\t').drop();
        }
        parser = parser
            .then(separator.optrep().drop())
            .then(next)
            .then(separator.optrep().drop());
    })
    return parser as TupleParser<any>;


}

function takeString(str: string) {
    return C.string(str)
}

function takeArrayParser(parser: IParser<any>, modifier: Modifier) {
    if (modifier === '?') {
        return F.try(parser).opt();
    }
    if (modifier === '*') {
        return F.try(parser).optrep();
    }
    // +
    return parser.rep();


}

function takeArrayString(str: string, modifier: Modifier) {
    if (modifier === '?') {
        return F.try(C.string(str)).opt();
    }
    if (modifier === '*') {
        return F.try(C.string(str)).optrep();
    }
    // +
    return C.string(str).rep();
}
