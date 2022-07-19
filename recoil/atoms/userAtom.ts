import { atom } from "recoil";
import { iUser } from '../../interfaces/iUser';

type defaultProps = null | iUser
export const userAtom = atom({
    key: "userAtom",
    default: null as defaultProps
})