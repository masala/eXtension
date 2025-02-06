// pathParser.test.ts
import { describe, it, expect } from 'vitest'
import { Streams } from '@masala/parser'
import { C } from '@masala/parser'
import { path, segments, segment } from './split' // <-- Adjust to your actual file
// e.g., `import { path, segments, segment } from '@/logic/myParsers';`

const delim = C.char('/')
  .rep()
  .drop()

describe('segment parser', () => {
  it('should parse a single segment without slashes', () => {
    const stream = Streams.ofString('cat')
    const result = segment(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toBe('cat')
    }
  })

  it('should fail on empty string', () => {
    const stream = Streams.ofString('')
    const result = segment(delim).parse(stream)
    expect(result.isAccepted()).toBe(false)
  })

  it('should parse until encountering a slash', () => {
    const stream = Streams.ofString('cat/dog')
    // Expect it to only parse 'cat' and leave '/dog' unconsumed
    const result = segment(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toBe('cat')
    }
  })
})

describe('segments parser', () => {
  it('should parse multiple segments split by slashes', () => {
    const stream = Streams.ofString('cat/dog')
    const result = segments(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      // [cat, dog]
      expect(result.value).toEqual(['cat', 'dog'])
    }
  })

  it('should handle extra slashes in between as a single delimiter', () => {
    const stream = Streams.ofString('cat///block')
    const result = segments(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      // [cat, block]
      expect(result.value).toEqual(['cat', 'block'])
    }
  })

  it('should parse only until we run out of non-slash characters', () => {
    const stream = Streams.ofString('cat/dog/')
    const result = segments(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toEqual(['cat', 'dog'])
    }
  })
})

describe('path parser', () => {
  it('should parse a path with leading, trailing, and repeated slashes', () => {
    const stream = Streams.ofString('//cat///block/p/post/')
    const result = path(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      // [cat, block, p, post]
      expect(result.value).toEqual(['cat', 'block', 'p', 'post'])
    }
  })

  it('should parse an empty path of only slashes as an empty array', () => {
    const stream = Streams.ofString('///')
    const result = path(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toEqual([])
    }
  })

  it('should parse a single segment path "cat"', () => {
    const stream = Streams.ofString('cat')
    const result = path(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toEqual(['cat'])
    }
  })

  it('should parse "/cat/" as ["cat"]', () => {
    const stream = Streams.ofString('/cat/')
    const result = path(delim).parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toEqual(['cat'])
    }
  })

  it('should parse an empty string as an empty array', () => {
    const stream = Streams.ofString('')
    const result = path(delim).parse(stream)
    // Because `segments(delim).single()` expects at least one segment,
    // you may find it fails or see how your grammar is structured.
    // The grammar suggests SEGMENTS? is optional, so let's see:
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toEqual([])
    }
  })
})
