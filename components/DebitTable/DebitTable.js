import { useState, useEffect } from "react";
import { splitFloatNumber, getSum } from "../../lib";
import s from "./DebitTable.module.css";
import Ico_up from "../../public/arrow-up-bold.svg";
import TransactionList from "../../components/Transaction/List/TransactionList";

export default function DebitTable({ debitArr = [], onDelete }) {
  const [debit, setDebit] = useState(debitArr);
  const [sum, setSum] = useState([0, 0]);

  useEffect(() => {
    setDebit(debitArr);
    const s = getSum(debitArr);
    const splitted = splitFloatNumber(s);
    setSum(splitted);
  }, [debitArr]);

  return (
    <section className={s.container}>
      <h3>
        <div className={s.arrow}>
          <Ico_up width={32} height={32} fill={"green"} />
        </div>
        <p className={s.budgetMain}>
          ({sum[0]}
          <span className={s.budgetKop}>{sum[1]}</span> ₴)
        </p>
      </h3>
      <TransactionList transactions={debit} onDelete={onDelete} />
    </section>
  );
}
