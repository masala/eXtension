import { X } from '../src/x'

test('null', () => {
  let content = 'null'
  const val = X.json().val(content)
  expect(val).toBeNull()
})

test('string', () => {
  let content = '"123"' //'"123" -'
  const val = X.json().val(content)
  expect(val).toBe('123')
})

test('object', () => {
  let content = {
    country: 'France',
    capital: 'Paris',
  }
  const str = JSON.stringify(content)
  const val = X.json().val(str)
  expect(val).toEqual(content)
})

test('deep object', () => {
  let content = {
    country: 'France',
    capital: {
      name: 'Paris',
      star: 'Kylian',
    },
  }
  const str = JSON.stringify(content)
  const val = X.json().val(str)
  expect(val).toEqual(content)
})
