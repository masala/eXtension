import { X } from '@masala/x'
import { C, Streams } from '@masala/parser'

const categories = X.split(C.char('/').drop())
const stream = Streams.ofString('a/b/c')
const result = categories.parse(stream)

console.log(result.isAccepted(), result.value)
