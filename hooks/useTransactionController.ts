import { fetchTransactions } from "@/db/transaction/fetchTransactions";
import { useRecoilState } from "recoil"
import { iTransaction } from "../interfaces/iTransaction"
import Transaction from "../model/transaction";
import { transactionsAtom } from "../recoil/atoms/transactionsAtom"

export interface IEditTransaction {
    description: string,
    amount: number,
    comment: string
}
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


    const edit = async (id: string, edit: IEditTransaction) => {
        const response = await fetch("/api/transaction", {
            method: "PUT",
            body: JSON.stringify({ _id: id, ...edit })
        });
        const r = await response.json();
        if (r) {
            setList(list.map(x => x._id === id ? r : x));
        }
        else {
            //TODO: show error


        }
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
        const revList = [...list];
        revList.reverse();
        return revList;
    }

    const refresh = async (userId: string) => {

        try {
            const date = new Date();
            const t = await fetchTransactions(
                userId,
                date.getFullYear(),
                date.getMonth() + 1
            );
            setList(t);

        } catch (error) {

        }
    }
    return {
        add,
        remove, getAll, getAllDesc, refresh, edit
    }
}