import TransactionGroup from "../Group/TransactionGroup";
import { groupTransactionsByDay } from "../../../lib";
import s from "./TransactionList.module.css";
import TransactionItem from "../Item/TransactionItem";
import { Fragment, useState, useEffect, useRef } from "react";
import { iTransaction } from "../../../interfaces/iTransaction";

interface TransactionListProps {
  transactions: iTransaction[];
  onDelete: (t: iTransaction) => void;
}
export default function TransactionList({
  transactions = [],
  onDelete,
}: TransactionListProps) {
  const grouped: any = groupTransactionsByDay(transactions);
  const keys: string[] = Object.keys(grouped).sort((a: string, b: string) => {
    const numA: number = Number(a);
    const numB: number = Number(b);
    // Number(a) < Number(b)
    if (numA < numB) return 1;
    if (numA > numB) return -1;
    return 0;
  });

  return (
    <ul className={s.table}>
      {keys.map((k) => (
        <Fragment key={k}>
          <TransactionGroup title={k} transactions={grouped[k]} />
          {grouped[k].map((transaction: iTransaction) => (
            <TransactionItem
              key={transaction._id}
              transaction={transaction}
              onDelete={onDelete}
            />
          ))}
        </Fragment>
      ))}
    </ul>
  );
}
