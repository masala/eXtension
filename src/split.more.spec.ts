// splitParser.test.ts
import { describe, it, expect } from 'vitest'
import { Streams, C } from '@masala/parser'
import { split } from './split' // <-- Adjust import to your code

// Complex delimiter: "/STOP" or "/STOP/"
const delim = C.string('/STOP')
  .then(C.char('/').opt())
  .rep()
  .drop()

describe('split parser with /STOP or /STOP/ delimiter', () => {
  it('should parse a single segment with no delimiter', () => {
    const stream = Streams.ofString('cat')
    const result = split(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      // Only one segment => ["cat"]
      expect(result.value).toEqual(['cat'])
    }
  })

  it('should parse a single segment if there is a leading delimiter', () => {
    // Leading: "/STOP" or "/STOP/"
    const stream = Streams.ofString('/STOPdog')
    // This means optional leading delim is consumed => first segment: "dog"
    const result = split(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toEqual(['dog'])
    }
  })

  it('should parse a single segment if there is a leading delimiter with a trailing slash', () => {
    const stream = Streams.ofString('/STOP/dog')
    // Here the delimiter is "/STOP/" => consumes that, leaving "dog" as the first segment
    const result = split(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toEqual(['dog'])
    }
  })

  it('should parse two segments "cat" and "dog" separated by "/STOP"', () => {
    const stream = Streams.ofString('cat/STOPdog')
    const result = split(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toEqual(['cat', 'dog'])
    }
  })

  it('should parse segments when the delimiter includes a trailing slash: "cat/STOP/dog"', () => {
    const stream = Streams.ofString('cat/STOP/dog')
    // The delimiter is effectively "/STOP/"
    // So "cat" is one segment, "dog" is another
    const result = split(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toEqual(['cat', 'dog'])
    }
  })

  it('should parse multiple segments, e.g. "cat -> dog -> mouse"', () => {
    const stream = Streams.ofString('cat/STOP/dog/STOPmouse')
    // Delimiters:
    //  - "/STOP/" = between 'cat' & 'dog'
    //  - "/STOP" = between 'dog' & 'mouse'
    const result = split(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toEqual(['cat', 'dog', 'mouse'])
    }
  })

  it('should handle leading and trailing delimiters plus optional slash', () => {
    // Leading: "/STOP"
    // Then "cat", delim is "/STOP/"
    // Then "dog", trailing again "/STOP"
    const stream = Streams.ofString('/STOPcat/STOP/dog/STOP')
    const result = split(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      // "cat" and "dog" only
      expect(result.value).toEqual(['cat', 'dog'])
    }
  })

  it('should parse an empty string as an empty array', () => {
    const stream = Streams.ofString('')
    const result = split(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toEqual([])
    }
  })

  it('should parse a string containing only delimiters (e.g. "/STOP/STOP") as empty array', () => {
    const stream = Streams.ofString('/STOP//STOP')
    const result = split(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      // Because there's no actual non-delimiter text
      expect(result.value).toEqual([])
    }
  })

  it('should parse repeated delimiters as one boundary each, producing no empty segments', () => {
    // e.g. "cat/STOP/STOP/dog" => "cat" then "dog", no empty middle segment
    const stream = Streams.ofString('cat/STOP//STOP/dog')
    const result = split(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toEqual(['cat', 'dog'])
    }
  })
})
