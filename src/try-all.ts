import { F, IParser} from '@masala/parser'

export function tryAll(array: IParser<any>[]) {
    if (array.length === 0) {
        return F.nop();
    }
    let parser = F.try(array[0]);
    for (let i = 1; i < array.length; i++) {
        parser = parser.or(F.try(array[i]));
    }

    return parser;
}