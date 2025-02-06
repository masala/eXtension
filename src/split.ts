import { Parser, F, C, Tuple, SingleParser, VoidParser } from '@masala/parser'

/*
PATH        -> DELIM? SEGMENTS? DELIM?
SEGMENTS    -> SEGMENT (DELIM SEGMENT)*
SEGMENT     -> [^/]+
DELIM       -> '/'+
 */

export const segment = (delim: VoidParser) =>
  F.not(delim)
    .rep()
    .map(c => c.join(''))

export const segments = (delim: VoidParser) =>
  segment(delim)
    .then(
      delim
        .drop()
        .then(segment(delim))
        .optrep()
    )
    .map(t => t.array() as string[])

export const split = (delim: VoidParser) =>
  delim
    .optrep()
    .drop()
    .then(segments(delim).optrep())
    .then(delim.optrep().drop())
    .single()
    .map(t => t || [])

function firstAndRest<T>(t: Tuple<unknown>): T[] {
  const a = t.array()
  if (a.length === 1) {
    return a as T[]
  }
  let first = a[0] as T
  let rest = a[1] as T[]
  return [first, ...rest]
}
