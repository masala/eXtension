import {F} from '@masala/parser'

export function inChars(strings: string[]) {
    return F.satisfy(function(value: string){
        for (let i = 0; i < strings.length; i++) {
            const s = strings[i];
            if (s.length === 3 && s[1] === '-') {
                if (s[0] <= value && value <= s[2]){
                    return true;
                }
            }else{
                if (s.includes(value)){
                    return true;
                }
            }
        }
        return false;
    })
}
