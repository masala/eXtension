import {X} from '../src/x'
import {C} from '@masala/parser'


test('simple take', () => {

    const c = C.char('x')
    const p =X.take(['<', c.rep(), ">"]).map(t=> t.join(''));
    const val = p.val("<xxx>");
    expect(val).toBe('<xxx>')
});