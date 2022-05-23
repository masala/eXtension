import { F, C, N, SingleParser } from '@masala/parser'
import { take } from './take'
import { tryAll } from './try-all'

export function json() {
  const NULL = C.string('null')
  const OPEN = C.char('{')
  const CLOSE = C.char('}')
  const DOTS = C.char(':')
  const COMMA = C.char(',')

  const NUMBER = N.number()
  const STRING = C.stringLiteral()

  function objectOrNothing(): SingleParser<any> {
    // FIXME: ES2015 code not great
    const value: any = {}

    const addValue = (entry: Array<any>) => {
      value[entry[0]] = entry[1]
      return value
    }
    const getValue = () => value

    const attribute = take([STRING, DOTS.drop(), F.lazy(expr)])
      .array()
      .map(addValue)
    return take([attribute, take([COMMA.drop(), attribute]).optrep()])
      .array()
      .opt()
      .map(getValue)
  }

  function expr() {
    const OBJECT = OPEN.drop()
      .then(F.lazy(objectOrNothing))
      .then(CLOSE.drop())
      .single()

    return tryAll([NUMBER, STRING, NULL.returns(null), OBJECT])
  }

  return expr()
}
