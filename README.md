# X, or Masala eXtensions

This is some useful snippets condensed in an easy api

## X.take

X.take() is a simplified Genlex where you define tokens, and tehey have by default classic separators ()

    const c = C.char('x')
    const p =X.take(['<', c.rep(), ">"]).map(t=> t.join(''));
    
    const val = p.val("<xx x >");
    expect(val).toBe('<xxx>')

Separators are by default 

    separator = C.charIn(' \r\n\f\t').drop();

but can be changed

    const c = C.char('x')
    const p =X.take(['<', c.rep(), ">"], C.char('-') ).map(t=> t.join(''));
    
    const val = p.val("<-x---x-x->");
    expect(val).toBe('<xxx>')

It's also possible to combine multiple take, like it's done in the Json parser


    return take([attribute, take([COMMA.drop(), attribute]).optrep()])



## X.tryAll


It combines multiple 

    F.try(x).or(F.try(y)).or(F.try(z))

into

    X.tryAll([x, y, z])


## X.json

It's a reusable json parser (WIP)


