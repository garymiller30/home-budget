import { useRecoilState } from "recoil"
import { iTransaction } from "../interfaces/iTransaction"
import Transaction from "../model/transaction";
import { transactionsAtom } from "../recoil/atoms/transactionsAtom"

export function useTransactionController() {
    const [list, setList] = useRecoilState(transactionsAtom);

    const add = async (transaction: Transaction) => {
        const response = await fetch("/api/transaction", {
            method: "POST",
            body: JSON.stringify(transaction),
        });
        const t = await response.json();
        setList([...list, t]);
    }

    const remove = async (transaction: iTransaction) => {
        const response = await fetch("/api/transaction", {
            method: "DELETE",
            body: JSON.stringify(transaction._id),
        });
        const r = await response.json();
        if (r) {
            setList(list.filter(t => t._id?.toString() !== transaction._id));
        } else {
            //TODO: show error
        }

    }
    const getAll = () => {
        return list;
    }
    const getAllDesc = () => {

        if (!list) return [];
        const revList = [...list];
        revList.reverse();
        return revList;
    }

    return {
        add,
        remove, getAll, getAllDesc
    }
}