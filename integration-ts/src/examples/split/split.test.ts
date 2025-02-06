import { X } from '@masala/x'
import { C, Streams } from '@masala/parser'
import { describe, it, expect } from 'vitest'

const categories = X.split(C.char('/').drop())

describe('integration of Masala/X', () => {
  it('should split', () => {
    const stream = Streams.ofString('a/b/c')
    const result = categories.parse(stream)
    expect(result.isAccepted()).toBe(true)
    if (result.isAccepted()) {
      expect(result.value).toEqual(['a', 'b', 'c'])
    }
  })
})
