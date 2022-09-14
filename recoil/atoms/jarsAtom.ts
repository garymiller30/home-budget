import { iJar } from "@/interfaces/iJar";
import { atom } from "recoil";

export const jarsAtom = atom({
    key: "jarsAtom",
    default: [] as iJar[]
})