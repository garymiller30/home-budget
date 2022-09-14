import { jarsAtom } from "@/recoil/atoms/jarsAtom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export function useJarController(userId: string) {
    const [list, setList] = useRecoilState(jarsAtom);
    const getJarByIdx = async (idx: number) => { }
    const getJars = () => {
        return list;
    }
    useEffect(() => {
        const getAll = async () => {
            const res = await fetch(`/api/jar?userId=${userId}`, { method: "GET", })
            const jars = await res.json();
            setList(jars);
        }
    }, []);

}