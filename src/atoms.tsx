import {atom} from "recoil";

// atom은 두 가지를 요구한다.
// 1. key - unique 해야한다.
// 2. default value - 기본값이 필요하다.
// 이것이 atom이 만드는 데 필요한 모든 것이다.
export const isDarkAtom = atom({
    key:"isDark",
    default:true, 
})