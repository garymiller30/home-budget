import { useState, useEffect } from "react";
import { iTransaction } from "../../../interfaces/iTransaction";
import { getSum, splitFloatNumber } from "../../../lib";
import TransactionList from "../List/TransactionList";
import s from "./TransactionTable.module.css";

interface TransactionTableProps {
  transactions: iTransaction[];
  icon: any;
  color: any;
  onDelete: (t: iTransaction) => void;
}

export default function TransactionTable({
  transactions = [],
  icon,
  color,
  onDelete,
}: TransactionTableProps) {
  const [trans, setTrans] = useState(transactions);
  const [sum, setSum] = useState([0, 0]);
  const Icon = icon;
  useEffect(() => {
    setTrans(transactions);
    const s = getSum(transactions);
    setSum(splitFloatNumber(s));
  }, [transactions]);

  return (
    <section>
      <div className={s.container}>
        <div className={s.arrow}>
          <Icon color={color} />
        </div>
        <p className={s.budgetMain}>
          ({sum[0]}
          <span className={s.budgetKop}>{sum[1]}</span>)
        </p>
      </div>
      <TransactionList transactions={trans} onDelete={onDelete} />
    </section>
  );
}
